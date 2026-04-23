---
layout: lesson
title: "Урок 25: Lambda-функции"
order: 25
---
## Содержание

- [Что такое lambda](#что-такое-lambda)
- [Синтаксис и ограничения](#синтаксис-и-ограничения)
- [Lambda vs def](#lambda-vs-def)
- [Lambda в сортировке](#lambda-в-сортировке)
- [Lambda с map(), filter(), sorted()](#lambda-с-map-filter-sorted)
- [Когда не стоит использовать lambda](#когда-не-стоит-использовать-lambda)
- [Практические примеры](#практические-примеры)
- [Задание](#задание)

---

## Что такое lambda

Lambda — это анонимная функция, записанная в одну строку. Слово «анонимная» означает, что у неё нет имени. Она создаётся там, где нужна, и часто передаётся в другую функцию как аргумент.

```python
# Обычная функция
def square(x):
    return x ** 2

# Lambda-эквивалент
square = lambda x: x ** 2

print(square(5))   # 25
```

---

## Синтаксис и ограничения

```python
lambda параметры: выражение
```

- Ключевое слово `lambda`
- Параметры через запятую (можно без параметров)
- Одно выражение после двоеточия — его результат автоматически возвращается

```python
# Без параметров
greet = lambda: "Привет!"
print(greet())   # Привет!

# Один параметр
double = lambda x: x * 2
print(double(7))   # 14

# Несколько параметров
add = lambda a, b: a + b
print(add(3, 5))   # 8

# С условным выражением
classify = lambda x: "положительное" if x > 0 else "неположительное"
print(classify(5))    # положительное
print(classify(-3))   # неположительное
```

### Ограничения

Lambda может содержать только **одно выражение** — нельзя написать несколько строк, использовать `if/else` в полной форме, циклы или `return`.

```python
# Нельзя сделать это в lambda:
def complex_function(x):
    if x > 0:
        result = x * 2
    else:
        result = 0
    return result
```

---

## Lambda vs def

| | `def` | `lambda` |
|-|-------|----------|
| Имя | Имеет имя | Анонимная |
| Строки кода | Несколько | Одна |
| Оператор return | Явный | Неявный |
| Документация | Поддерживает docstring | Нет |
| Сложность логики | Любая | Только одно выражение |
| Когда использовать | Основной код | Передача в функцию |

```python
# def — для полноценных, переиспользуемых функций
def get_discount_price(price, discount_pct):
    """Возвращает цену после скидки."""
    return price * (1 - discount_pct / 100)

# lambda — для простых одноразовых операций
prices = [100, 250, 80, 430]
discounted = sorted(prices, key=lambda p: p * 0.9)
```

---

## Lambda в сортировке

Самое частое применение lambda — параметр `key` в `sorted()` и `sort()`.

```python
# Сортировка по последней букве
words = ["банан", "яблоко", "кот", "вишня"]
words.sort(key=lambda w: w[-1])
print(words)   # ['яблоко', 'банан', 'вишня', 'кот']

# Сортировка по абсолютному значению
numbers = [-10, 3, -1, 8, -5]
numbers.sort(key=lambda x: abs(x))
print(numbers)   # [-1, 3, -5, 8, -10]

# Сортировка словарей по значению поля
students = [
    {"name": "Иван", "grade": 85},
    {"name": "Мария", "grade": 92},
    {"name": "Алексей", "grade": 78},
]

students.sort(key=lambda s: s["grade"], reverse=True)
for s in students:
    print(f"{s['name']}: {s['grade']}")
# Мария: 92
# Иван: 85
# Алексей: 78
```

Сортировка по нескольким критериям:

```python
people = [("Иван", 25), ("Мария", 30), ("Алексей", 25)]

# По возрасту, затем по имени
people.sort(key=lambda p: (p[1], p[0]))
print(people)
# [('Алексей', 25), ('Иван', 25), ('Мария', 30)]
```

---

## Lambda с map(), filter(), sorted()

Lambda органично сочетается с функциями высшего порядка. (Подробнее о `map()` и `filter()` — в следующем уроке.)

### sorted() с lambda

```python
words = ["Привет", "мир", "PYTHON", "код"]
sorted_words = sorted(words, key=lambda w: w.lower())
print(sorted_words)   # ['код', 'мир', 'Привет', 'PYTHON']
```

### map() с lambda

```python
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)   # [1, 4, 9, 16, 25]
```

### filter() с lambda

```python
numbers = [-3, 5, -1, 8, -2, 10, 3]
positive = list(filter(lambda x: x > 0, numbers))
print(positive)   # [5, 8, 10, 3]
```

---

## Когда не стоит использовать lambda

Lambda ухудшает читаемость там, где логика сложная или функция нужна в нескольких местах.

```python
# Плохо — слишком сложно, и не переиспользовать
result = sorted(data, key=lambda x: (x["category"], -x["price"], x["name"].lower()))

# Лучше — именованная функция с понятным именем
def sort_key(item):
    return (item["category"], -item["price"], item["name"].lower())

result = sorted(data, key=sort_key)
```

Также не стоит присваивать lambda переменной, если можно написать обычную функцию:

```python
# Не рекомендуется (PEP 8)
square = lambda x: x ** 2

# Правильно
def square(x):
    return x ** 2
```

---

## Практические примеры

### Сортировка файлов по расширению и имени

```python
files = ["report.pdf", "main.py", "data.csv", "utils.py", "notes.txt"]

files.sort(key=lambda f: (f.rsplit(".", 1)[-1], f))
print(files)
# ['data.csv', 'report.pdf', 'main.py', 'utils.py', 'notes.txt']
```

### Диспетчер операций

```python
operations = {
    "add":      lambda a, b: a + b,
    "subtract": lambda a, b: a - b,
    "multiply": lambda a, b: a * b,
    "divide":   lambda a, b: a / b if b != 0 else None,
}

def calculate(op, a, b):
    func = operations.get(op)
    if func is None:
        return "Неизвестная операция"
    return func(a, b)

print(calculate("add", 10, 5))       # 15
print(calculate("multiply", 4, 7))   # 28
```

### Трансформация данных

```python
users = [
    {"first": "иван", "last": "петров"},
    {"first": "мария", "last": "иванова"},
]

full_names = list(map(
    lambda u: f"{u['first'].capitalize()} {u['last'].capitalize()}",
    users
))
print(full_names)   # ['Иван Петров', 'Мария Иванова']
```

---

## Задание

1. Напишите lambda-функцию, которая принимает число и возвращает `True` если оно простое (делится только на 1 и само на себя). Протестируйте на числах 7, 10, 13.

2. Дан список строк `["banana", "apple", "cherry", "date", "fig"]`. Отсортируйте его по длине строки (по убыванию), а при одинаковой длине — по алфавиту. Используйте lambda.

3. Используя lambda и `filter()`, оставьте в списке только те словари, у которых поле `"active"` равно `True`:
   ```python
   users = [
       {"name": "Иван", "active": True},
       {"name": "Мария", "active": False},
       {"name": "Алексей", "active": True},
   ]
   ```

4. Создайте словарь из трёх математических операций (`"+", "-", "*"`) где значения — lambda-функции. Напишите функцию `apply(op, a, b)`, которая применяет нужную операцию.
