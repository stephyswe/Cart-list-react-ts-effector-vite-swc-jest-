# React + TS + Effector + Vite + SWC/Jest

Тестовый проект на базе сборщика [Vite](https://vitejs.dev) с применением фреймворка React, синтаксисом TypeScript, стейт-менеджером [Effector](https://effector.dev/ru/) и окружением для запуска тестов [Jest](https://jestjs.io/ru/) на основе [Rust (SWC)](https://swc.rs/docs/usage/jest) для более быстрого прогона тестов.

В данном проекте я постарался применить effector best practices, полученные на личном опыте работы с библиотекой в огромном высоконагруженном проекте.

## Тестирование effector
Для тестирования работы бизнес-логики effector, её лучше всего максимально отделять от ui-компонентов.  
Таким образом, мы пишем unit-тесты и интеграционные тесты для слоя бизнес-логики.  
При тестировании react-компонентов (ui-тесты), нужно делать моки (подмена модулей) для хуков эффектора (useStore, useUnit, и т.п.), так как мы тестируем компонент изолированно от бизнес логики, и логику изолированно от ui.


## Ресурсы

- [CodeSandbox Projects — Docs](https://codesandbox.io/docs/projects)
- [CodeSandbox — Discord](https://discord.gg/Ggarp3pX5H)
- [Vite — GitHub](https://github.com/vitejs/vite)
- [Vite — Docs](https://vitejs.dev/guide/)
