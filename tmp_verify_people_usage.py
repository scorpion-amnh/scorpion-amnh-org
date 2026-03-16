from pathlib import Path
import re
import json

ROOT = Path(__file__).resolve().parent
people_dir = ROOT / "public/images/people"
people_files = sorted([p.name for p in people_dir.iterdir() if p.is_file() and not p.name.startswith('.')])
people_set = set(people_files)

# Collect all literal /images/... path references across app code
all_image_paths = set()
for f in ROOT.joinpath("app").rglob("*"):
    if f.suffix not in {".ts", ".tsx", ".js", ".jsx"}:
        continue
    text = f.read_text(encoding="utf-8")
    # quoted paths in jsx/ts strings
    for m in re.finditer(r"/images/[^\"'\)\}\s]+", text):
        all_image_paths.add(m.group(0))

# Parse aliases from imageUtils
utils = (ROOT / "app/people/imageUtils.ts").read_text(encoding="utf-8")
alias_match = re.search(r"peopleImageFilenameAliases:\s*Record<[^>]+>\s*=\s*\{(.*?)\n\};", utils, re.S)
alias_values = set()
if alias_match:
    for _, value in re.findall(r'"([^"]+)"\s*:\s*"([^"]+)"', alias_match.group(1)):
        alias_values.add(value)

# Build reverse usage map per people filename
usage_reasons: dict[str, list[str]] = {name: [] for name in people_files}

# 1) exact direct people path
for name in people_files:
    p = f"/images/people/{name}"
    if p in all_image_paths:
        usage_reasons[name].append("direct:/images/people")

# 2) legacy root path style /images/<filename> (resolved by PeopleImage logic)
for name in people_files:
    p = f"/images/{name}"
    if p in all_image_paths:
        usage_reasons[name].append("legacy:/images")

# 3) referenced via alias target in imageUtils
for name in people_files:
    if name in alias_values:
        usage_reasons[name].append("alias-target")

used = sorted([name for name, reasons in usage_reasons.items() if reasons])
unused = sorted([name for name, reasons in usage_reasons.items() if not reasons])

print(json.dumps({
    "people_total": len(people_files),
    "used_count": len(used),
    "unused_count": len(unused),
    "used_examples": [{"file": n, "reasons": usage_reasons[n]} for n in used[:40]],
    "unused_files": unused,
}, ensure_ascii=False, indent=2))
