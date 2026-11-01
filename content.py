"""Portfolio copy and settings.

Edit this file to personalize the site without changing its templates.
"""

# --- Identity ---------------------------------------------------------------

NAME = "Santiago Garcia"
TAGLINE = "Software engineer working in Python, C++, Java, and the web."

# Path to your photo, relative to the static folder. Leave empty to use initials.
# Square images crop best.
IMAGE = ""

ABOUT = (
    "I work across Python, C++, Java, and the web, with a focus on building "
    "software that is clear, useful, and thoughtfully made. I enjoy learning "
    "new tools, solving problems step by step, and turning ideas into projects "
    "people can use."
)

LOCATION = "TODO: City, Country"  # Delete this line if you prefer not to show a location.

# --- Links ------------------------------------------------------------------

GITHUB_URL = "https://github.com/santiagogarcia13"
GITHUB_HANDLE = "santiagogarcia13"
EMAIL = "yagosanti13@gmail.com"

# Add or remove links as needed. Each entry is (label, url).
LINKS = [
    ("GitHub", GITHUB_URL),
    ("Email", f"mailto:{EMAIL}"),
]

# Set this to a Formspree endpoint to receive submissions from the hosted form.
# Leave it empty to use the local Flask route.
FORMSPREE_ENDPOINT = ""

# --- Skills -----------------------------------------------------------------

SKILLS = [
    {
        "name": "Languages",
        "items": ["Python", "C++", "Java"],
    },
    {
        "name": "Web",
        "items": ["HTML", "CSS", "JavaScript"],
    },
    {
        "name": "Tools",
        "items": ["Git", "GitHub", "Flask"],
    },
]

# --- Projects ---------------------------------------------------------------
# Add screenshots under static/images/projects/ and set `screenshot` to the
# path relative to static/, for example "images/projects/my-project.png".
# `links` is a list of (label, url) pairs.

PROJECTS = [
    {
        "name": "MealExplorer",
        "summary": (
            "An Ionic and Angular application for exploring meals and recipes. "
            "It runs in the browser and can be packaged for Android with Capacitor."
        ),
        "tags": ["Ionic", "Angular", "Capacitor", "Android"],
        "screenshot": "",
        "screenshot_alt": "MealExplorer application screenshot",
        "links": [
            ("Source code", "https://github.com/santiagogarcia13/MealExplorer"),
        ],
    },
]
