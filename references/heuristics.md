# Nielsen Norman Group (NN/g) 10 Usability Heuristics

Use this document to evaluate user interfaces against Jakob Nielsen's 10 Usability Heuristics. 

## Heuristic Definitions

### 1. Visibility of System Status
The design should always keep users informed about what is going on, through appropriate feedback within a reasonable time.
* **Core Rule:** Provide immediate feedback for user actions.
* **Core Rule:** Clearly communicate current system state (e.g., loading, success, error, active filters).

### 2. Match Between System and the Real World
The design should speak the users' language. Use words, phrases, and concepts familiar to the user, rather than internal jargon. Follow real-world conventions, making information appear in a natural and logical order.
* **Core Rule:** Avoid technical jargon, developer terminology, or database IDs in client-facing copy.
* **Core Rule:** Mapping actions to real-world mental models (e.g., a trash can icon for deleting).

### 3. User Control and Freedom
Users often choose system functions by mistake and will need a clearly marked "emergency exit" to leave the unwanted action without having to go through an extended dialogue. Support undo and redo.
* **Core Rule:** Provide explicit "Cancel", "Undo", or "Back" options for multi-step processes or destructive actions.
* **Core Rule:** Do not trap the user in modal states without a clear close mechanism.

### 4. Consistency and Standards
Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions.
* **Core Rule:** Maintain internal consistency (e.g., buttons of the same priority look identical across pages).
* **Core Rule:** Maintain external consistency (e.g., shopping cart icon is in the top right corner).

### 5. Error Prevention
Even better than good error messages is a careful design which prevents a problem from occurring in the first place. Either eliminate error-prone conditions or check for them and present users with a confirmation option before they commit to the action.
* **Core Rule:** Disable invalid actions proactively (e.g., gray out "Submit" if required fields are missing).
* **Core Rule:** Use constraints to prevent bad data entry (e.g., date pickers instead of free-text dates).

### 6. Recognition Rather Than Recall
Minimize the user's memory load by making elements, actions, and options visible. The user should not have to remember information from one part of the interface to another. Information required to use the design should be visible or easily retrievable when needed.
* **Core Rule:** Keep instructions or field requirements visible during data entry.
* **Core Rule:** Provide history, recent searches, or persistent state indicators so users do not have to memorize past steps.

### 7. Flexibility and Efficiency of Use
Accelerators — unseen by the novice user — may often speed up the interaction for the expert user such that the system can cater to both inexperienced and experienced users. Allow users to tailor frequent actions.
* **Core Rule:** Provide keyboard shortcuts, macros, or bulk-action capabilities for power users.
* **Core Rule:** Allow personalization or customization of workflows and layouts.

### 8. Aesthetic and Minimalist Design
Interfaces should not contain information which is irrelevant or rarely needed. Every extra unit of information in an interface competes with the relevant units of information and diminishes their relative visibility.
* **Core Rule:** Prioritize signal-to-noise ratio; remove visual clutter and redundant decorations.
* **Core Rule:** Leverage visual hierarchy (whitespace, typography contrast) to surface critical paths.

### 9. Help Users Recognize, Diagnose, and Recover from Errors
Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution.
* **Core Rule:** Display human-readable error messages near the source of the error.
* **Core Rule:** Provide an actionable path to resolution (e.g., "Click here to retry" instead of "Error 500").

### 10. Help and Documentation
It’s best if the system doesn’t need any additional explanation. However, it may be necessary to provide documentation to help users understand how to complete their tasks.
* **Core Rule:** Make help easy to search and contextually accessible at the point of need.
* **Core Rule:** Format documentation into concrete, digestible steps.
