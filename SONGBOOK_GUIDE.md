# Cancionero

Edita este archivo:

- [assets/data/songbook.json](/Users/stephany/Desktop/invitacion-simple-v4/assets/data/songbook.json)

Formato:

```json
[
  {
    "id": "te-encontre",
    "title": "Te Encontré",
    "artist": "El Vega",
    "spotify": "https://open.spotify.com/playlist/XXXXXXXX",
    "tags": ["romántica", "latina"],
    "search": ["te encontre", "ya encontre la mujer"],
    "snippet": "Frase corta opcional",
    "lyrics": "Letra completa aquí\\nLínea 2\\nLínea 3"
  }
]
```

Qué va en cada campo:

- `id`: identificador corto sin espacios. Ejemplo: `te-encontre`
- `title`: nombre de la canción
- `artist`: artista
- `spotify`: enlace directo a Spotify
- `tags`: palabras para filtrar
- `search`: frases clave para buscarla más fácil
- `snippet`: opcional; una frase corta destacada
- `lyrics`: letra completa con saltos usando `\\n`

Cómo añadir otra canción:

1. Duplica un bloque dentro del array `[...]`
2. Cambia todos los campos
3. Separa cada canción con una coma, menos la última

Ejemplo con dos canciones:

```json
[
  {
    "id": "te-encontre",
    "title": "Te Encontré",
    "artist": "El Vega",
    "spotify": "https://open.spotify.com/playlist/XXXXXXXX",
    "tags": ["romántica", "latina"],
    "search": ["te encontre", "ya encontre la mujer"],
    "snippet": "Ya encontré la mujer que por tanto tiempo había esperado",
    "lyrics": "Línea 1\\nLínea 2\\nLínea 3"
  },
  {
    "id": "quedate",
    "title": "Quédate",
    "artist": "Christian Meier",
    "spotify": "https://open.spotify.com/playlist/XXXXXXXX",
    "tags": ["balada", "romántica"],
    "search": ["quedate esta noche conmigo", "ya no estare"],
    "snippet": "Quédate esta noche conmigo, mi amor",
    "lyrics": "Cae la tarde en un frío color\\nEscucho mi nombre en el corredor\\nYa no es tu risa la que me recuerda\\nQue un libro se acaba\\nAunque sea el mejor\\nFrente a mí y yo sé que no ves\\nQue la esencia nos hizo crecer\\nY es que aunque me disparen\\nNo me comparen con fotos de ayer\\nQuédate esta noche conmigo, mi amor\\nY cierra los ojos, entiende que yo\\nEnciendo mis sueños\\nCuando a mi lado siento tu calor\\nY abrázame fuerte por última vez\\nQue no nos importe qué pase después\\nSi tú también sabes\\nQue cuando amanezca yo ya no estaré\\nYa no estaré\\nSolamente te pido un favor\\nToma este puñal que es mejor que yo\\nY hunde su fuerza en mí de lado a lado\\nY arranca la pena con todo el dolor\\nTodos saben que pronto me voy\\nTe seguí hasta la plaza mayor\\nY aunque todo ha cambiado\\nNunca he olvidado el idiota que soy\\nQuédate esta noche conmigo, mi amor\\nY cierra los ojos, entiende que yo\\nEnciendo mis sueños\\nCuando a mi lado siento tu calor\\nY abrázame fuerte por última vez\\nQue no nos importe qué pase después\\nSi tú también sabes\\nQue cuando amanezca yo ya no estaré\\nYa no estaré"
  }
]
```
