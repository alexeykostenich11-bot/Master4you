# Master4You

Лендинг-прототип сервиса для поиска клиентов частными мастерами в духе Profi.ru.

## Быстрый старт

Откройте `index.html` в браузере или поднимите локальный сервер:

```bash
python -m http.server 8000
```

Затем перейдите на `http://localhost:8000` (если браузер показывает "Not found", откройте
`http://localhost:8000/index.html`).

## Публичная ссылка для показа друзьям

Самый простой способ — использовать туннель. Запустите локальный сервер (см. выше), затем
откройте публичный URL одним из вариантов ниже:

### Вариант 1: Cloudflare Tunnel (рекомендуется, без регистрации)

```bash
cloudflared tunnel --url http://localhost:8000
```

В терминале появится публичная ссылка вида `https://*.trycloudflare.com`.

### Вариант 2: LocalTunnel (через Node.js)

```bash
npx localtunnel --port 8000
```

Команда вернёт ссылку вида `https://*.loca.lt`.

## Публикация на GitHub

1. Создайте новый репозиторий на GitHub (например, `master4you`).
2. В терминале в корне проекта выполните:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Если репозиторий уже инициализирован, достаточно добавить remote и выполнить `git push`.
