import os
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main():
    with tempfile.TemporaryDirectory(prefix="portfolio-build-venv-") as temp_dir:
        venv_dir = Path(temp_dir)
        subprocess.run(
            [sys.executable, "-m", "venv", str(venv_dir)],
            check=True,
        )

        python = venv_dir / ("Scripts/python.exe" if os.name == "nt" else "bin/python")
        subprocess.run(
            [str(python), "-m", "pip", "install", "-r", str(ROOT / "requirements.txt")],
            cwd=ROOT,
            check=True,
        )
        subprocess.run(
            [str(python), "-m", "flask", "--app", "app", "export-static"],
            cwd=ROOT,
            check=True,
        )


if __name__ == "__main__":
    main()
