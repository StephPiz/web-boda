import json
from pathlib import Path


path = Path("assets/data/songbook.json")
data = json.loads(path.read_text(encoding="utf-8"))

updates = {
    "test": "ok"
}

for song in data:
    if song["id"] in updates:
        song["lyrics"] = updates[song["id"]]

path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
