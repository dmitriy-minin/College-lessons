---
layout: lesson
title: "Урок 30: Стандартная библиотека"
order: 30
---
## Содержание

- [Обзор стандартной библиотеки](#обзор-стандартной-библиотеки)
- [Модуль math](#модуль-math)
- [Модуль random](#модуль-random)
- [Модуль datetime](#модуль-datetime)
- [Практические примеры](#практические-примеры)
- [Задание](#задание)

---

## Обзор стандартной библиотеки

Стандартная библиотека Python — это набор готовых модулей, которые поставляются вместе с языком. Устанавливать ничего не нужно — просто `import`.

Некоторые полезные модули:

| Модуль | Назначение |
|--------|-----------|
| `math` | Математические функции и константы |
| `random` | Генерация случайных чисел |
| `datetime` | Работа с датами и временем |
| `os` | Взаимодействие с операционной системой |
| `sys` | Системные параметры и функции |
| `json` | Чтение и запись JSON |
| `re` | Регулярные выражения |
| `collections` | Специальные структуры данных |
| `itertools` | Инструменты для итерации |
| `pathlib` | Работа с путями файловой системы |
| `time` | Работа со временем (паузы, замеры) |

В этом уроке подробно рассмотрим `math`, `random` и `datetime`.

---

## Модуль math

### Константы

```python
import math

print(math.pi)     # 3.141592653589793 — число π
print(math.e)      # 2.718281828459045 — основание натурального логарифма
print(math.tau)    # 6.283185307179586 — τ = 2π
print(math.inf)    # inf — бесконечность
```

### Округление

```python
import math

print(math.floor(3.7))   # 3  — округление вниз
print(math.ceil(3.2))    # 4  — округление вверх
print(math.trunc(3.9))   # 3  — отбросить дробную часть
print(round(3.5))        # 4  — стандартное округление (встроенная)
```

### Степени и корни

```python
print(math.sqrt(16))     # 4.0  — квадратный корень
print(math.pow(2, 10))   # 1024.0  — возведение в степень
print(math.exp(1))       # 2.718...  — e^1
print(math.log(math.e))  # 1.0  — натуральный логарифм
print(math.log(100, 10)) # 2.0  — логарифм по основанию 10
print(math.log2(8))      # 3.0  — логарифм по основанию 2
print(math.log10(1000))  # 3.0
```

### Тригонометрия

Аргументы в **радианах**:

```python
import math

print(math.sin(0))              # 0.0
print(math.cos(0))              # 1.0
print(math.sin(math.pi / 2))   # 1.0

# Конвертация: градусы ↔ радианы
print(math.degrees(math.pi))   # 180.0
print(math.radians(180))       # 3.141592653589793
```

### Прочие функции

```python
print(math.factorial(5))    # 120
print(math.gcd(12, 8))      # 4  — наибольший общий делитель
print(math.lcm(4, 6))       # 12 — наименьшее общее кратное (Python 3.9+)
print(math.fabs(-3.5))      # 3.5  — абсолютное значение float
print(math.isnan(float("nan")))  # True
print(math.isinf(math.inf))      # True
```

---

## Модуль random

### Случайные числа

```python
import random

# float от 0.0 до 1.0 (не включая 1.0)
print(random.random())

# float в диапазоне [a, b]
print(random.uniform(1.5, 5.5))

# int в диапазоне [a, b] (включительно)
print(random.randint(1, 10))

# int из range (как range, без последнего)
print(random.randrange(0, 100, 5))   # кратное 5 от 0 до 95
```

### Выбор из последовательности

```python
fruits = ["яблоко", "банан", "вишня", "манго"]

# Случайный элемент
print(random.choice(fruits))

# k случайных элементов без повторений
print(random.sample(fruits, k=2))

# k случайных элементов с возможными повторениями
print(random.choices(fruits, k=5))
```

`choices()` поддерживает веса:

```python
items = ["обычный", "редкий", "эпический", "легендарный"]
weights = [70, 20, 8, 2]   # проценты

drop = random.choices(items, weights=weights, k=1)[0]
print(drop)
```

### Перемешивание

```python
deck = list(range(1, 14))
random.shuffle(deck)   # перемешивает список на месте
print(deck)
```

### Воспроизводимость — seed

`seed()` фиксирует начальное состояние генератора. Один и тот же seed даёт одинаковую последовательность:

```python
random.seed(42)
print(random.randint(1, 100))   # всегда 52
print(random.randint(1, 100))   # всегда 11

random.seed(42)
print(random.randint(1, 100))   # снова 52
```

---

## Модуль datetime

### Классы модуля

| Класс | Описание |
|-------|----------|
| `date` | Только дата: год, месяц, день |
| `time` | Только время: часы, минуты, секунды, микросекунды |
| `datetime` | Дата + время |
| `timedelta` | Промежуток времени |

### date — работа с датой

```python
from datetime import date

today = date.today()
print(today)              # 2024-04-22
print(today.year)         # 2024
print(today.month)        # 4
print(today.day)          # 22

# Создать конкретную дату
birthday = date(1990, 6, 15)
print(birthday)           # 1990-06-15
```

### datetime — дата и время

```python
from datetime import datetime

now = datetime.now()
print(now)                # 2024-04-22 14:35:07.123456
print(now.year)           # 2024
print(now.hour)           # 14
print(now.minute)         # 35

# Создать конкретный момент
event = datetime(2024, 12, 31, 23, 59, 0)
print(event)              # 2024-12-31 23:59:00
```

### timedelta — работа с промежутками

```python
from datetime import datetime, timedelta

now = datetime.now()

# Прибавить
tomorrow = now + timedelta(days=1)
next_week = now + timedelta(weeks=1)
in_90_days = now + timedelta(days=90)

# Вычесть
yesterday = now - timedelta(days=1)

# Разница между датами
birthday = datetime(1990, 6, 15)
age_days = (now - birthday).days
print(f"Прожито дней: {age_days}")
print(f"Прожито лет: {age_days // 365}")
```

### Форматирование — strftime

`strftime` превращает `datetime` в строку по заданному шаблону.

| Код | Значение | Пример |
|-----|----------|--------|
| `%Y` | Год 4 цифры | `2024` |
| `%m` | Месяц 2 цифры | `04` |
| `%d` | День 2 цифры | `22` |
| `%H` | Часы (0-23) | `14` |
| `%M` | Минуты | `35` |
| `%S` | Секунды | `07` |
| `%A` | Полное название дня | `Monday` |
| `%B` | Полное название месяца | `April` |

```python
from datetime import datetime

now = datetime.now()

print(now.strftime("%d.%m.%Y"))           # 22.04.2024
print(now.strftime("%Y-%m-%d %H:%M:%S"))  # 2024-04-22 14:35:07
print(now.strftime("%d %B %Y"))           # 22 April 2024
```

### Разбор строки — strptime

`strptime` делает обратное: парсит строку в `datetime`.

```python
from datetime import datetime

date_str = "22.04.2024"
dt = datetime.strptime(date_str, "%d.%m.%Y")
print(dt)           # 2024-04-22 00:00:00
print(dt.year)      # 2024

time_str = "2024-04-22 14:35:00"
dt = datetime.strptime(time_str, "%Y-%m-%d %H:%M:%S")
print(dt.hour)      # 14
```

---

## Практические примеры

### Генератор паролей

```python
import random
import string

def generate_password(length=12):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = random.choices(characters, k=length)
    return "".join(password)

print(generate_password())       # случайный пароль из 12 символов
print(generate_password(20))     # пароль из 20 символов
```

### Расчёт возраста

```python
from datetime import date

def calculate_age(birth_date):
    today = date.today()
    age = today.year - birth_date.year
    # Учесть, был ли уже день рождения в этом году
    if (today.month, today.day) < (birth_date.month, birth_date.day):
        age -= 1
    return age

birthday = date(1995, 8, 20)
print(f"Возраст: {calculate_age(birthday)} лет")
```

### Случайная выборка без повторений

```python
import random

participants = ["Иван", "Мария", "Алексей", "Зина", "Борис", "Лена"]

print("Жеребьёвка:")
order = random.sample(participants, k=len(participants))
for i, name in enumerate(order, 1):
    print(f"  {i}. {name}")
```

### Математика: решение квадратного уравнения

```python
import math

def solve_quadratic(a, b, c):
    """Решает квадратное уравнение ax^2 + bx + c = 0."""
    discriminant = b ** 2 - 4 * a * c

    if discriminant < 0:
        return None   # нет вещественных корней
    elif discriminant == 0:
        x = -b / (2 * a)
        return (x,)
    else:
        x1 = (-b + math.sqrt(discriminant)) / (2 * a)
        x2 = (-b - math.sqrt(discriminant)) / (2 * a)
        return (x1, x2)

print(solve_quadratic(1, -5, 6))    # (3.0, 2.0)
print(solve_quadratic(1, 2, 1))     # (-1.0,)
print(solve_quadratic(1, 0, 1))     # None
```

---

## Задание

1. Используя `math`, напишите функцию `hypotenuse(a, b)`, которая возвращает длину гипотенузы прямоугольного треугольника. Проверьте на тройке `3, 4, 5`.

2. Используя `random`, напишите симулятор бросков кубика:
   - Бросить кубик 1000 раз
   - Подсчитать, сколько раз выпало каждое значение (1-6)
   - Вывести результат в виде `1: 167 раз (16.7%)`

3. Используя `datetime`, напишите программу, которая:
   - Принимает дату рождения в формате `"ДД.ММ.ГГГГ"`
   - Выводит возраст в годах
   - Выводит, сколько дней до следующего дня рождения
   - Выводит, какой день недели был в день рождения

4. Используя `random.seed(0)`, сгенерируйте воспроизводимый список из 10 случайных целых чисел в диапазоне от -50 до 50. Найдите среднее, минимум и максимум.
