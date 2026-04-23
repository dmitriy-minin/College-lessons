---
layout: lesson
title: "Урок 22: Функции"
order: 22
---
## Содержание

- [Зачем нужны функции](#зачем-нужны-функции)
- [Определение функции — def](#определение-функции--def)
- [Аргументы функции](#аргументы-функции)
- [Оператор return](#оператор-return)
- [Значения по умолчанию](#значения-по-умолчанию)
- [Возврат нескольких значений](#возврат-нескольких-значений)
- [Документирование функций](#документирование-функций)
- [Функции как объекты](#функции-как-объекты)
- [Практические примеры](#практические-примеры)
- [Задание](#задание)

---

## Зачем нужны функции

Функция — это именованный блок кода, который можно вызывать многократно. Функции решают три задачи:

**Переиспользование** — написали один раз, вызываем где угодно.

**Декомпозиция** — сложная задача разбивается на маленькие понятные части.

**Читаемость** — код с функциями читается как текст: `calculate_tax()`, `send_email()`, `validate_password()`.

```python
# Без функции — повторяем код трижды
print("=" * 30)
print("Отчёт за январь")
print("=" * 30)

print("=" * 30)
print("Отчёт за февраль")
print("=" * 30)

# С функцией — повторения нет
def print_header(title):
    print("=" * 30)
    print(title)
    print("=" * 30)

print_header("Отчёт за январь")
print_header("Отчёт за февраль")
```

---

## Определение функции — def

```python
def имя_функции(параметры):
    # тело функции
    return результат
```

Ключевые слова:
- `def` — объявляет функцию
- Имя — по правилам `snake_case`
- Параметры — в скобках, через запятую (можно пустые скобки)
- Тело — с отступом 4 пробела

```python
def greet():
    print("Привет, мир!")

greet()   # вызов функции
greet()   # можно вызывать сколько угодно раз
```

Функция определяется один раз, но вызывается в любом месте программы после определения.

---

## Аргументы функции

Аргументы — это данные, которые передаются в функцию при вызове.

```python
def greet(name):
    print(f"Привет, {name}!")

greet("Иван")    # Привет, Иван!
greet("Мария")   # Привет, Мария!
```

Несколько аргументов:

```python
def add(a, b):
    print(f"{a} + {b} = {a + b}")

add(3, 5)    # 3 + 5 = 8
add(10, 25)  # 10 + 25 = 35
```

### Параметры vs аргументы

- **Параметры** — переменные в определении функции: `def add(a, b)`
- **Аргументы** — значения, переданные при вызове: `add(3, 5)`

В обиходе эти слова часто используют как синонимы.

---

## Оператор return

`return` завершает выполнение функции и возвращает значение вызывающему коду.

```python
def square(x):
    return x ** 2

result = square(5)
print(result)   # 25

print(square(3) + square(4))   # 25
```

Без `return` функция возвращает `None`:

```python
def greet(name):
    print(f"Привет, {name}!")

result = greet("Иван")
print(result)   # None
```

`return` можно использовать для раннего выхода из функции:

```python
def divide(a, b):
    if b == 0:
        print("Деление на ноль невозможно")
        return
    return a / b

print(divide(10, 2))   # 5.0
print(divide(10, 0))   # Деление на ноль невозможно
```

---

## Значения по умолчанию

Параметры могут иметь значения по умолчанию. Их можно не передавать при вызове.

```python
def greet(name, greeting="Привет"):
    print(f"{greeting}, {name}!")

greet("Иван")                  # Привет, Иван!
greet("Мария", "Добрый день")  # Добрый день, Мария!
```

Параметры с дефолтными значениями должны идти **после** параметров без дефолтов:

```python
# Правильно
def power(base, exponent=2):
    return base ** exponent

# Неправильно — SyntaxError
def power(base=2, exponent):
    return base ** exponent
```

```python
print(power(3))     # 9   (3^2)
print(power(3, 3))  # 27  (3^3)
```

---

## Возврат нескольких значений

Функция может вернуть несколько значений через запятую — Python упакует их в кортеж.

```python
def min_max(numbers):
    return min(numbers), max(numbers)

result = min_max([3, 1, 8, 5, 2])
print(result)          # (1, 8)

low, high = min_max([3, 1, 8, 5, 2])
print(f"Мин: {low}, Макс: {high}")   # Мин: 1, Макс: 8
```

Ещё пример:

```python
def circle_stats(radius):
    import math
    area = math.pi * radius ** 2
    circumference = 2 * math.pi * radius
    return round(area, 2), round(circumference, 2)

area, circ = circle_stats(5)
print(f"Площадь: {area}, Длина окружности: {circ}")
# Площадь: 78.54, Длина окружности: 31.42
```

---

## Документирование функций

Строка документации (`docstring`) описывает, что делает функция. Пишется сразу после `def` в тройных кавычках.

```python
def calculate_bmi(weight, height):
    """
    Вычисляет индекс массы тела (ИМТ).

    Аргументы:
        weight (float): вес в килограммах
        height (float): рост в метрах

    Возвращает:
        float: значение ИМТ
    """
    return weight / height ** 2

print(calculate_bmi(70, 1.75))   # 22.86

# Посмотреть документацию
help(calculate_bmi)
print(calculate_bmi.__doc__)
```

---

## Функции как объекты

В Python функция — это объект. Её можно присвоить переменной, передать в другую функцию.

```python
def say_hello():
    print("Привет!")

# Присвоить переменной
action = say_hello
action()   # Привет!

# Передать в другую функцию
def run(func):
    func()

run(say_hello)   # Привет!
```

---

## Практические примеры

### Конвертер температур

```python
def celsius_to_fahrenheit(c):
    """Переводит градусы Цельсия в Фаренгейты."""
    return c * 9 / 5 + 32

def fahrenheit_to_celsius(f):
    """Переводит градусы Фаренгейта в Цельсии."""
    return (f - 32) * 5 / 9

print(celsius_to_fahrenheit(100))   # 212.0
print(fahrenheit_to_celsius(32))    # 0.0
```

### Валидация пароля

```python
def validate_password(password):
    """Проверяет пароль на соответствие требованиям."""
    if len(password) < 8:
        return False, "Пароль слишком короткий (минимум 8 символов)"
    if not any(c.isdigit() for c in password):
        return False, "Пароль должен содержать хотя бы одну цифру"
    if not any(c.isupper() for c in password):
        return False, "Пароль должен содержать хотя бы одну заглавную букву"
    return True, "Пароль подходит"

valid, message = validate_password("qwerty")
print(message)   # Пароль слишком короткий (минимум 8 символов)

valid, message = validate_password("Qwerty123")
print(message)   # Пароль подходит
```

### Калькулятор

```python
def add(a, b):      return a + b
def subtract(a, b): return a - b
def multiply(a, b): return a * b
def divide(a, b):
    if b == 0:
        return None
    return a / b

operations = {"+": add, "-": subtract, "*": multiply, "/": divide}

a, op, b = 10, "*", 5
result = operations[op](a, b)
print(f"{a} {op} {b} = {result}")   # 10 * 5 = 50
```

---

## Задание

1. Напишите функцию `is_even(n)`, которая возвращает `True` если число чётное, иначе `False`.

2. Напишите функцию `factorial(n)`, которая возвращает факториал числа `n` с помощью цикла.

3. Напишите функцию `count_vowels(text)`, которая возвращает количество гласных букв в строке (учитывайте и русские, и латинские гласные).

4. Напишите функцию `clamp(value, min_val, max_val)`, которая возвращает:
   - `min_val`, если `value` меньше `min_val`
   - `max_val`, если `value` больше `max_val`
   - `value` в противном случае

5. Напишите функцию `summarize(numbers)`, которая принимает список чисел и возвращает кортеж из четырёх значений: сумма, среднее, минимум, максимум.
