from pathlib import Path
import re
import json
import unicodedata
from typing import Optional

ROOT = Path('/Users/isadora/Library/CloudStorage/Dropbox/Projects/amnh/scorpion-amnh-org')
PEOPLE_PAGE = ROOT / 'app/people/page.tsx'
text = PEOPLE_PAGE.read_text()

people_image_folder_overrides = {
    '2024-fieldwork-Pio-and-Jairo.HEIC': 'field',
    '2024-preparing-samples-abroad.JPG': 'field',
    'Loria.jpg': 'field',
    'drawing.jpg': 'research',
}

people_image_filename_aliases = {
    '2025-Colmenares-and-visiting-researchers-in-the-collection.jpg': '2025-Pio-Colmenares-and-visiting-researchers-in-the-collection.jpg',
    '2025-Molecular-lab-interns-Summer-2025.jpg': '2025-molecular-lab-summer-interns--Adithya-Raghunath--Jakub-Minkiewicz--Jack-Coulson--Maxine-Ting.jpg',
    '2025-Group-photp-back-Nick-William-Jose-Jairo-Drusilla-Lorenzo-Pio-front-Javier-Colby.jpg': '2025-lab-outside-guilder-center--Nick-Cazzaniga--William-Phillips--Jose-Barba-Montoya--Jairo-A-Moreno-Gonzalez--Drusilla-Sheridan--Lorenzo-Prendini--Pio-Colmenares--Javier-Blasco-Arostegui--Colby-Sain.jpg',
    'highschool2006.jpg': 'Jianhua-Lin--and--Qiao-Rong-Huang.jpg',
    'SRMPSashaandEleanor.jpg': 'Sasha-Reiter--and--Eleanor-Goetz.jpg',
    'jose_barba_arachnology_lab.jpg': 'Jose-Barba-Montoya.jpg',
    'Jesus.jpg': 'Jesus-Alberto-Cruz-Lopez.jpg',
    '2024-lunch-Pio-Ricardo-Lorenzo-Colby-Jairo.JPG': '2024-lab-lunch--Pio-Colmenares--Ricardo-Botero-Trujillo--Lorenzo-Prendini--Colby-Sain--Jairo-Blasco-Arostegui.JPG',
    '2023-dinner-Left-front-to-back-Pio-Isadora-Stephanie-Lorenzo-Valentin-right-front-to-back-Victoria-Jairo-Javier-Taylor-Colby.JPG': '2023-lab-dinner--Pio-Colmenares--Isadora-Colmenares--Stephanie-Loria--Lorenzo-Prendini--Valentin-Ehrenthal--Victoria-Long--Jairo-A-Moreno-Gonzalez--Javier-Blasco-Arostegui--Taylor-Hicks--Colby-Sain.JPG',
    '2023-Kimberly-Russell-and-students-from-Rutgers-University.HEIC': '2023-Kimberly-Russell-and-students-from-Rutgers-University.jpg',
    '2022-Lab-end-of-day-Javier-Marcel-Colby-Jairo-Sahibzada-Pio.JPG': '2022-lab-in-rose-center--Javier-Blasco-Arostegui--Marcel-Hermes--Colby-Sain--Jairo-A-Moreno-Gonzalez--Sahibzada-M-Jawad--Pio-Colmenares.jpg',
    '2021-lunch-Ricardo-Lorenzo-Lou-Pio.HEIC': '2021-lab-lunch--Ricardo-Botero-Trujillo--Lorenzo-Prendini--Lou-Sorkin--Pio-Colmenares.jpg',
    'labfall2019_p08qpk.jpg': '2019-lab-in-NYC-fall.jpg',
    'summer2019.jpg': '2019-lab-in-NYC-summer.jpg',
    'Prendini_Lab_Summer2018.jpg': '2018-lab-outside-AMNH.jpg',
    'PrendiniLabSeptember2017.jpg': '2017-lab-outside-AMNH.jpg',
    'PrendiniLabAugust2017.jpg': '2017-lab-in-NYC.jpg',
    'PrendiniLabAugust2015.jpg': '2015-lab-outside-AMNH.jpg',
    'PrendiniLabJan2015.jpg': '2015-lab-inside-AMNH-paleontology.jpg',
    'scorpiongroups2013.jpg': '2013-lab-outside-AMNH.jpg',
    'scorpiongroups.jpg': '2011-lab-outside-AMNH.jpg',
    'scorpiongroup.jpg': '2006-lab-outside-AMNH.jpg',
    'ica.jpg': '2007-scorpion-biologists-ICA.jpg',
    'Solifugae_2007.jpg': '2007-BSI-solifugae-meeting-at-DMNS.jpg',
    'Atol_2008.jpg': '2008-ATOL-morphology-scroing-party-at-Smithsonian-USNM.jpg',
}

public_files = {
    '/' + str(path.relative_to(ROOT / 'public')).replace('\\\\', '/')
    for path in (ROOT / 'public').rglob('*')
    if path.is_file()
}


def normalize_image_lookup_text(value: str) -> str:
    value = ''.join(ch for ch in unicodedata.normalize('NFD', value) if unicodedata.category(ch) != 'Mn')
    value = value.replace('ß', 'ss')
    value = re.sub(r"[’']", '', value)
    value = value.lower()
    value = re.sub(r'[^a-z0-9]+', ' ', value).strip()
    return value


def to_title_case_hyphen(value: str) -> str:
    return '-'.join(segment[:1].upper() + segment[1:] for segment in value.split(' ') if segment)


def get_name_based_people_candidates(name: str) -> list[str]:
    normalized = normalize_image_lookup_text(name)
    if not normalized:
        return []

    tokens = [token for token in normalized.split(' ') if token]
    base_names: list[str] = []

    if tokens:
        base_names.append(to_title_case_hyphen(' '.join(tokens)))
        base_names.append('-'.join(tokens))

    if len(tokens) >= 3:
        without_single_letter_tokens = [token for token in tokens if len(token) > 1]
        if len(without_single_letter_tokens) >= 2:
            base_names.append(to_title_case_hyphen(' '.join(without_single_letter_tokens)))
            base_names.append('-'.join(without_single_letter_tokens))

    extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG']
    candidates: list[str] = []
    for base_name in dict.fromkeys(base_names):
        for extension in extensions:
            candidates.append(f'/images/people/{base_name}.{extension}')

    return list(dict.fromkeys(candidates))


def resolve_people_image_src(src: str) -> str:
    if not src.startswith('/images/'):
        return src

    relative = src.replace('/images/', '', 1)
    if '/' in relative:
        return src

    override_folder = people_image_folder_overrides.get(relative)
    if override_folder:
        return f'/images/{override_folder}/{relative}'

    alias_filename = people_image_filename_aliases.get(relative, relative)
    return f'/images/people/{alias_filename}'


def get_image_candidates(src: str, alt: Optional[str]) -> list[str]:
    candidates = [resolve_people_image_src(src)]
    if alt:
        candidates.extend(get_name_based_people_candidates(alt))

    deduped = []
    for candidate in candidates:
        if candidate not in deduped:
            deduped.append(candidate)
    return deduped


def get_context(pos: int) -> dict:
    before = text[:pos]
    section_matches = list(re.finditer(r'data-section="([^"]+)"', before))
    tab_matches = list(re.finditer(r'data-tab="([^"]+)"', before))
    section = section_matches[-1].group(1) if section_matches else None
    tab = tab_matches[-1].group(1) if tab_matches else None
    line = before.count('\n') + 1
    return {'section': section, 'tab': tab, 'line': line}


broken_images = []

# 1) Literal <Image src="..." alt="..." ... />
for match in re.finditer(r'<Image\\s+[^>]*?src="([^"]+)"[^>]*?alt="([^"]*)"[^>]*/?>', text, re.S):
    src = match.group(1)
    alt = match.group(2)
    if not src.startswith('/images/'):
        continue

    candidates = get_image_candidates(src, alt)
    found = next((candidate for candidate in candidates if candidate in public_files), None)
    if not found:
        ctx = get_context(match.start())
        broken_images.append({
            'name': alt or '(no alt text)',
            'src': src,
            'line': ctx['line'],
            'section': ctx['section'],
            'tab': ctx['tab'],
        })

# 2) Undergraduate alumni array (template src={`/images/${person.image}`})
array_start = text.find('{[')
array_end = text.find('].map((person, index, list) => (')
if array_start != -1 and array_end != -1 and array_end > array_start:
    array_block = text[array_start:array_end]
    entry_pattern = re.compile(r"\{\s*name:\s*'([^']+)'[^\}]*?image:\s*(null|'([^']*)')", re.S)
    for entry in entry_pattern.finditer(array_block):
        name = entry.group(1)
        raw_image = entry.group(2)
        file_name = entry.group(3)
        if raw_image == 'null':
            continue
        src = f'/images/{file_name}'
        candidates = get_image_candidates(src, name)
        if not any(candidate in public_files for candidate in candidates):
            ctx = get_context(array_start + entry.start())
            broken_images.append({
                'name': name,
                'src': src,
                'line': ctx['line'],
                'section': ctx['section'],
                'tab': ctx['tab'],
            })

# Placeholder checks
placeholder_people = []

# 3) Direct PhotoPlaceholder name="..."
for match in re.finditer(r'<PhotoPlaceholder\s+name="([^"]+)"\s*/?>', text):
    name = match.group(1)
    candidates = get_name_based_people_candidates(name)
    found = next((candidate for candidate in candidates if candidate in public_files), None)
    if not found:
        ctx = get_context(match.start())
        placeholder_people.append({
            'name': name,
            'line': ctx['line'],
            'section': ctx['section'],
            'tab': ctx['tab'],
        })

# 4) Undergraduate alumni array entries with image: null (render PhotoPlaceholder name={person.name})
if array_start != -1 and array_end != -1 and array_end > array_start:
    array_block = text[array_start:array_end]
    entry_pattern = re.compile(r"\{\s*name:\s*'([^']+)'[^\}]*?image:\s*(null|'([^']*)')", re.S)
    for entry in entry_pattern.finditer(array_block):
        name = entry.group(1)
        raw_image = entry.group(2)
        if raw_image != 'null':
            continue

        candidates = get_name_based_people_candidates(name)
        if not any(candidate in public_files for candidate in candidates):
            ctx = get_context(array_start + entry.start())
            placeholder_people.append({
                'name': name,
                'line': ctx['line'],
                'section': ctx['section'],
                'tab': ctx['tab'],
            })

# De-duplicate by (name, section, tab)
seen_placeholder = set()
placeholder_deduped = []
for item in placeholder_people:
    key = (item['name'], item['section'], item['tab'])
    if key in seen_placeholder:
        continue
    seen_placeholder.add(key)
    placeholder_deduped.append(item)

seen_broken = set()
broken_deduped = []
for item in broken_images:
    key = (item['name'], item['src'], item['section'], item['tab'])
    if key in seen_broken:
        continue
    seen_broken.add(key)
    broken_deduped.append(item)

print(json.dumps({
    'broken_images_count': len(broken_deduped),
    'placeholders_count': len(placeholder_deduped),
    'broken_images': broken_deduped,
    'placeholders': placeholder_deduped,
}, ensure_ascii=False, indent=2))
