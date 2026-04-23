---
layout: lesson
title: "Урок 26: Функции высшего порядка"
order: 26
---
## Содержание

- [Что такое функции высшего порядка](#что-такое-функции-высшего-порядка)
- [map() — трансформация](#map--трансформация)
- [filter() — фильтрация](#filter--фильтрация)
- [zip() — параллельный перебор](#zip--параллельный-перебор)
- [Сравнение: функции высшего порядка vs включения](#сравнение-функции-высшего-порядка-vs-включения)
- [Практические примеры](#практические-примеры)
- [Задание](#задание)

---

## Что такое функции высшего порядка

Функция высшего порядка — это функция, которая принимает другую функцию как аргумент или возвращает функцию как результат.

```python
def apply(func, value):
    return func(value)

print(apply(str.upper, "hello"))   # HELLO
print(apply(abs, -42))             # 42
```

Python имеет несколько встроенных функций высшего порядка: `map()`, `filter()`, `sorted()`, `min()`, `max()`. В этом уроке подробно разберём `map()`, `filter()` и `zip()`.

---

## map() — трансформация

`map(функция, последовательность)` применяет функцию к каждому элементу последовательности и возвращает **итератор** с результатами.

```python
numbers = [1, 2, 3, 4, 5]

squared = map(lambda x: x ** 2, numbers)
print(list(squared))   # [1, 4, 9, 16, 25]
```

`map()` возвращает объект-итератор, не список. Чтобы получить список — оборачиваем в `list()`.

### С именованной функцией

```python
def celsius_to_fahrenheit(c):
    return c * 9 / 5 + 32

temps_c = [0, 20, 37, 100]
temps_f = list(map(celsius_to_fahrenheit, temps_c))
print(temps_f)   # [32.0, 68.0, 98.6, 212.0]
```

### С методами строк

```python
words = ["  привет  ", " мир ", "  python  "]
cleaned = list(map(str.strip, words))
print(cleaned)   # ['привет', 'мир', 'python']

upper = list(map(str.upper, ["hello", "world"]))
print(upper)   # ['HELLO', 'WORLD']
```

### map() с несколькими последовательностями

```python
a = [1, 2, 3]
b = [10, 20, 30]

sums = list(map(lambda x, y: x + y, a, b))
print(sums)   # [11, 22, 33]
```

Обработка останавливается по самой короткой последовательности.

---

## filter() — фильтрация

`filter(функция, последовательность)` возвращает **итератор** только с теми элементами, для которых функция вернула `True`.

```python
numbers = [1, -2, 3, -4, 5, -6]

positive = list(filter(lambda x: x > 0, numbers))
print(positive)   # [1, 3, 5]
```

### С именованной функцией

```python
def is_adult(age):
    return age >= 18

ages = [15, 22, 17, 30, 14, 19]
adults = list(filter(is_adult, ages))
print(adults)   # [22, 30, 19]
```

### Фильтрация строк

```python
words = ["python", "", "java", "", "c", "go"]
non_empty = list(filter(None, words))   # None — убирает falsy значения
print(non_empty)   # ['python', 'java', 'c', 'go']
```

Когда вместо функции передать `None`, `filter()` убирает все falsy значения (`0`, `""`, `None`, `False`, `[]`):

```python
data = [1, 0, "hello", "", None, 42, False, []]
truthy = list(filter(None, data))
print(truthy)   # [1, 'hello', 42]
```

### Фильтрация словарей

```python
products = [
    {"name": "Ноутбук", "price": 80000, "in_stock": True},
    {"name": "Мышь", "price": 1500, "in_stock": False},
    {"name": "Клавиатура", "price": 3000, "in_stock": True},
    {"name": "Монитор", "price": 25000, "in_stock": True},
]

available = list(filter(lambda p: p["in_stock"], products))
affordable = list(filter(lambda p: p["price"] < 10000 and p["in_stock"], products))

print([p["name"] for p in affordable])   # ['Мышь', 'Клавиатура'] — но мышь не в стоке
```

---

## zip() — параллельный перебор

`zip(*последовательности)` объединяет несколько последовательностей в итератор кортежей. Каждый кортеж содержит элементы с одинаковым индексом.

```python
names = ["Иван", "Мария", "Алексей"]
scores = [85, 92, 78]

combined = list(zip(names, scores))
print(combined)   # [('Иван', 85), ('Мария', 92), ('Алексей', 78)]
```

### В цикле for

```python
for name, score in zip(names, scores):
    print(f"{name}: {score}")
# Иван: 85
# Мария: 92
# Алексей: 78
```

### Три и более последовательности

```python
names = ["Иван", "Мария", "Алексей"]
ages = [25, 30, 22]
cities = ["Москва", "Питер", "Казань"]

for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age} лет, {city}")
```

### Поведение при разных длинах

По умолчанию `zip()` останавливается по **короткой** последовательности:

```python
a = [1, 2, 3, 4, 5]
b = ["a", "b", "c"]

print(list(zip(a, b)))   # [(1, 'a'), (2, 'b'), (3, 'c')]  — 4 и 5 отброшены
```

Чтобы использовать самую длинную — `zip_longest` из `itertools`:

```python
from itertools import zip_longest

print(list(zip_longest(a, b, fillvalue="-")))
# [(1, 'a'), (2, 'b'), (3, 'c'), (4, '-'), (5, '-')]
```

### Создание словаря через zip()

```python
keys = ["name", "age", "city"]
values = ["Иван", 25, "Москва"]

person = dict(zip(keys, values))
print(person)   # {'name': 'Иван', 'age': 25, 'city': 'Москва'}
```

### Распаковка zip — «разархивирование»

```python
pairs = [(1, "a"), (2, "b"), (3, "c")]
numbers, letters = zip(*pairs)

print(numbers)   # (1, 2, 3)
print(letters)   # ('a', 'b', 'c')
```

---

## Сравнение: функции высшего порядка vs включения

Оба подхода решают одни задачи. Выбор — вопрос стиля и читаемости.

```python
numbers = [1, 2, 3, 4, 5, 6]

# map() — умножить на 2
doubled_map = list(map(lambda x: x * 2, numbers))
doubled_lc  = [x * 2 for x in numbers]

# filter() — только чётные
evens_filter = list(filter(lambda x: x % 2 == 0, numbers))
evens_lc     = [x for x in numbers if x % 2 == 0]
```

Оба варианта дают одинаковый результат. Включения (`[]`) обычно считаются более читаемыми в простых случаях. `map()` и `filter()` выигрывают, когда уже есть готовая именованная функция.

```python
# filter() + именованная функция — очень читаемо
def is_valid_email(email):
    return "@" in email and "." in email.split("@")[-1]

emails = ["user@example.com", "invalid", "admin@site.ru", "broken@"]
valid = list(filter(is_valid_email, emails))
```

---

## Практические примеры

### Нормализация оценок

```python
raw_scores = [45, 82, 60, 91, 55, 78]
max_score = max(raw_scores)

normalized = list(map(lambda s: round(s / max_score * 100, 1), raw_scores))
print(normalized)   # [49.5, 90.1, 65.9, 100.0, 60.4, 85.7]
```

### Объединение и фильтрация данных

```python
names = ["Иван", "Мария", "Алексей", "Зина"]
scores = [55, 88, 42, 91]

# Пары (имя, балл) только для сдавших
passed = [(name, score) for name, score in zip(names, scores) if score >= 60]
print(passed)   # [('Мария', 88), ('Зина', 91)]
```

### Трансформация матрицы

```python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# Транспонирование через zip
transposed = list(map(list, zip(*matrix)))
for row in transposed:
    print(row)
# [1, 4, 7]
# [2, 5, 8]
# [3, 6, 9]
```

---

## Задание

1. Используя `map()`, переведите список температур из Цельсия в Кельвины (формула: `K = C + 273.15`):
   ```python
   celsius = [0, 20, -10, 37, 100]
   ```

2. Используя `filter()`, оставьте только слова длиннее 4 символов:
   ```python
   words = ["кот", "питон", "яблоко", "мак", "программа", "цикл"]
   ```

3. Даны три списка: имена, возрасты, города. Используя `zip()`, создайте список строк в формате `"Имя (возраст) — Город"`.

4. Используя комбинацию `map()` и `filter()`, из списка чисел `[-5, -2, 0, 3, 7, -1, 4]` получите список квадратов только положительных чисел.

5. Дан список словарей. Используя `filter()` и `map()`, получите список имён активных пользователей в верхнем регистре:
   ```python
   users = [
       {"name": "иван", "active": True},
       {"name": "мария", "active": False},
       {"name": "алексей", "active": True},
   ]
   # Ожидаемый результат: ['ИВАН', 'АЛЕКСЕЙ']
   ```
