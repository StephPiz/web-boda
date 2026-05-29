import json
from pathlib import Path


UPDATES = {
    "te-encontre": {
        "lyrics": "Quien iba a pensar"
    }
}


def main():
    path = Path("assets/data/songbook.json")
    data = json.loads(path.read_text(encoding="utf-8"))

    for song in data:
        update = UPDATES.get(song.get("id"))
        if not update:
            continue
        song.update(update)

    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
