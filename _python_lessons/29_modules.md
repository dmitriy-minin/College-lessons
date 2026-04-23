---
layout: lesson
title: "Урок 29: Модули и пакеты"
order: 29
---
## Содержание

- [Что такое модуль](#что-такое-модуль)
- [Импорт модуля — import](#импорт-модуля--import)
- [Выборочный импорт — from ... import](#выборочный-импорт--from--import)
- [Псевдонимы — as](#псевдонимы--as)
- [Создание своего модуля](#создание-своего-модуля)
- [Пакеты](#пакеты)
- [Переменная __name__](#переменная-__name__)
- [Поиск модулей](#поиск-модулей)
- [Практические примеры](#практические-примеры)
- [Задание](#задание)

---

## Что такое модуль

Модуль — это файл с расширением `.py`, содержащий функции, классы и переменные, которые можно использовать в других программах. Модули позволяют организовывать код и переиспользовать его.

Python поставляется с богатой **стандартной библиотекой** — сотнями встроенных модулей. Дополнительные модули устанавливаются через `pip`.

---

## Импорт модуля — import

Ключевое слово `import` загружает модуль. После этого доступ к его содержимому — через точку.

```python
import math

print(math.pi)           # 3.141592653589793
print(math.sqrt(16))     # 4.0
print(math.floor(3.7))   # 3
print(math.ceil(3.2))    # 4
```

```python
import random

print(random.random())         # случайное float от 0 до 1
print(random.randint(1, 10))   # случайное int от 1 до 10
```

```python
import os

print(os.getcwd())         # текущая директория
print(os.path.exists("/"))  # True — существует ли путь
```

---

## Выборочный импорт — from ... import

Позволяет импортировать конкретные объекты из модуля. После этого к ним обращаются без имени модуля.

```python
from math import pi, sqrt, floor

print(pi)          # 3.141592653589793
print(sqrt(25))    # 5.0
print(floor(4.9))  # 4
```

Импорт всего содержимого — `*` (не рекомендуется):

```python
from math import *

print(sin(0))   # 0.0
print(cos(0))   # 1.0
```

Это засоряет пространство имён — непонятно, откуда берётся `sin` или `cos`. Лучше импортировать явно.

---

## Псевдонимы — as

`as` задаёт короткое имя для модуля или объекта.

```python
import numpy as np         # стандартный псевдоним numpy
import pandas as pd        # стандартный псевдоним pandas
import matplotlib.pyplot as plt

from datetime import datetime as dt

now = dt.now()
print(now)
```

Псевдонимы для модулей стандартной библиотеки:

```python
import collections as col
import itertools as it
from pathlib import Path as P
```

Хорошие псевдонимы — короткие и общепринятые. Не стоит менять имя произвольно.

---

## Создание своего модуля

Любой `.py` файл — это модуль. Создадим файл `utils.py`:

```python
# utils.py

PI = 3.14159

def area_circle(radius):
    """Площадь круга."""
    return PI * radius ** 2

def greet(name):
    """Приветственное сообщение."""
    return f"Привет, {name}!"

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def distance_to(self, other):
        return ((self.x - other.x)**2 + (self.y - other.y)**2) ** 0.5
```

Используем в `main.py`:

```python
# main.py

import utils

print(utils.PI)                  # 3.14159
print(utils.area_circle(5))     # 78.53975
print(utils.greet("Иван"))      # Привет, Иван!

p1 = utils.Point(0, 0)
p2 = utils.Point(3, 4)
print(p1.distance_to(p2))       # 5.0
```

Или выборочный импорт:

```python
from utils import greet, area_circle

print(greet("Мария"))
print(area_circle(3))
```

---

## Пакеты

Пакет — это директория с файлом `__init__.py`, которая группирует несколько модулей.

Структура пакета `geometry`:

```
geometry/
    __init__.py
    circle.py
    rectangle.py
    utils.py
```

`circle.py`:

```python
import math

def area(radius):
    return math.pi * radius ** 2

def perimeter(radius):
    return 2 * math.pi * radius
```

`rectangle.py`:

```python
def area(width, height):
    return width * height

def perimeter(width, height):
    return 2 * (width + height)
```

`__init__.py` (может быть пустым или содержать удобные импорты):

```python
from .circle import area as circle_area
from .rectangle import area as rect_area
```

Использование:

```python
# Прямой импорт из подмодуля
from geometry.circle import area
print(area(5))

# Через __init__.py
import geometry
print(geometry.circle_area(5))
```

---

## Переменная __name__

Каждый модуль имеет специальную переменную `__name__`. Когда файл запускается напрямую, `__name__` равно `"__main__"`. Когда файл импортируется — `__name__` равно имени модуля.

```python
# utils.py

def greet(name):
    return f"Привет, {name}!"

# Этот блок выполняется ТОЛЬКО при прямом запуске
if __name__ == "__main__":
    print("Тестирую модуль:")
    print(greet("Разработчик"))
```

При `python utils.py`:
```
Тестирую модуль:
Привет, Разработчик!
```

При `import utils` из другого файла — блок `if __name__ == "__main__"` не выполняется.

Это стандартная идиома Python: всегда помещайте тестовый код в `if __name__ == "__main__"`.

---

## Поиск модулей

Когда вы пишете `import utils`, Python ищет модуль в следующем порядке:

1. Встроенные модули (`sys`, `os`, `math`, ...)
2. Текущая директория
3. Директории из переменной окружения `PYTHONPATH`
4. Директории стандартной библиотеки
5. Директории установленных пакетов (`site-packages`)

Посмотреть пути поиска:

```python
import sys
for path in sys.path:
    print(path)
```

---

## Практические примеры

### Структура проекта

```
my_project/
    main.py
    config.py
    helpers/
        __init__.py
        string_utils.py
        math_utils.py
```

`config.py`:

```python
DATABASE_URL = "sqlite:///data.db"
DEBUG = True
MAX_RETRIES = 3
```

`helpers/string_utils.py`:

```python
def slugify(text):
    """Превращает строку в URL-slug."""
    return text.lower().strip().replace(" ", "-")

def truncate(text, max_length=100):
    """Обрезает строку до max_length символов."""
    if len(text) <= max_length:
        return text
    return text[:max_length - 3] + "..."
```

`main.py`:

```python
import config
from helpers.string_utils import slugify, truncate

if config.DEBUG:
    print("Режим отладки включён")

title = "Моя первая статья на Python"
print(slugify(title))            # моя-первая-статья-на-python
print(truncate(title, 20))       # Моя первая статья...
```

---

## Задание

1. Создайте файл `calculator.py` с четырьмя функциями: `add(a, b)`, `subtract(a, b)`, `multiply(a, b)`, `divide(a, b)`. В блоке `if __name__ == "__main__"` протестируйте каждую функцию.

2. Импортируйте `calculator.py` в `main.py` тремя способами:
   - `import calculator` — обратитесь через `calculator.add(2, 3)`
   - `from calculator import add, multiply`
   - `from calculator import divide as div`

3. Создайте пакет `converters/` с тремя модулями:
   - `temperature.py` — функции `celsius_to_fahrenheit()` и `fahrenheit_to_celsius()`
   - `length.py` — функции `km_to_miles()` и `miles_to_km()`
   - `__init__.py` — импортирует все функции

4. В файле `main.py` импортируйте нужные функции из пакета и продемонстрируйте их работу.
