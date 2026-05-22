---
name: ios-android-translator
description: Помогает дизайнеру переводить компоненты между iOS (HIG) и Android (Material 3). Триггер фразами «переведи на Android», «iOS-аналог», «как называется X в Material 3», «отличия HIG и M3», «design for cross-platform». Использует курируемую базу `mappings/*.md` рядом с этим скилом и при необходимости лезет на developer.apple.com или m3.material.io.
---

# iOS ↔ Android Translator

Skill для дизайнеров, которые работают с двумя платформами и не хотят держать в голове, что Action Sheet на iOS — это **не** Bottom Sheet на Android.

## Когда активируется

- «Как на Android называется Segmented Control?»
- «Переведи этот экран на iOS»
- «В чём разница между HIG Tab Bar и M3 Navigation Bar?»
- «Какие компоненты использовать для модального выбора на обеих платформах?»

## Источник правды

Курируемая база живёт в `mappings/*.md` рядом с этим SKILL.md (либо в репо `mmkeewa/ios-android-helper`, если скил установлен через `claude plugin install`). Каждый файл — одна пара компонентов.

**Шаги:**
1. Прочитать все маппинги: `ls mappings/` → `Read` каждый, что релевантен запросу
2. Если в базе пары нет — сделать WebFetch на официальные доки:
   - iOS: `https://developer.apple.com/design/human-interface-guidelines/`
   - Android: `https://m3.material.io/`
3. Если нашёл новую пару в доках, которой нет в базе — предложи пользователю создать PR в `mmkeewa/ios-android-helper`, добавив файл `mappings/<slug>.md` по шаблону из README репо

## Формат ответа

Для каждого вопроса возвращай:

1. **Имена компонентов** на обеих платформах
2. **Таблицу ключевых отличий** (поведение, не только внешний вид)
3. **Когда что выбирать** — на 2–3 пункта
4. **Ссылки на первоисточники** (HIG + M3) из фронтматтера
5. **Дата верификации** — из поля `lastVerified`. Если `stale: true` — предупреди.

Не выдумывай имена компонентов. Если не нашёл — скажи прямо и дай ссылку на корень доков.

## Что НЕ делай

- Не отвечай по памяти, если есть маппинг в базе — читай файл, цитируй его. Память LLM устаревает быстрее, чем доки.
- Не предлагай React Native / Flutter компоненты — это нативные системы.
- Не путай Segmented Control с табами навигации (TabView / NavigationBar).

## Расширение базы

Когда обнаруживается новая пара, шаблон файла:

```md
---
slug: <kebab-case>
category: navigation | modals | input | feedback | typography | icons
ios:
  name: <HIG name>
  hig: <URL>
android:
  name: <M3 name>
  m3: <URL>
status: stable
lastVerified: YYYY-MM-DD
tags: [...]
---

## Что это
...

## Ключевые отличия
| Аспект | iOS | Android |
|---|---|---|

## Когда что выбирать
- ...

## Частые ошибки
- ...
```
