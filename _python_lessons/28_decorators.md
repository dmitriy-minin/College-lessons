---
layout: lesson
title: "Урок 28: Декораторы"
order: 28
---
## Содержание

- [Что такое декоратор](#что-такое-декоратор)
- [Функции как объекты — повторение](#функции-как-объекты--повторение)
- [Замыкания — основа декораторов](#замыкания--основа-декораторов)
- [Создание декоратора](#создание-декоратора)
- [Синтаксис @](#синтаксис-)
- [Декораторы с аргументами функции](#декораторы-с-аргументами-функции)
- [functools.wraps](#functoolswraps)
- [Несколько декораторов](#несколько-декораторов)
- [Практические примеры](#практические-примеры)
- [Задание](#задание)

---

## Что такое декоратор

Декоратор — это функция, которая **оборачивает** другую функцию, добавляя ей новое поведение без изменения её кода.

Типичные задачи декораторов:
- Логирование вызовов
- Измерение времени выполнения
- Проверка прав доступа
- Кэширование результатов
- Повторные попытки при ошибке

---

## Функции как объекты — повторение

Декораторы возможны потому, что в Python функции — это объекты. Их можно передавать и возвращать.

```python
def greet():
    return "Привет!"

# Присвоить переменной
say_hello = greet
print(say_hello())   # Привет!

# Передать как аргумент
def run(func):
    return func()

print(run(greet))   # Привет!

# Вернуть из функции
def get_greeter():
    return greet

greeter = get_greeter()
print(greeter())   # Привет!
```

---

## Замыкания — основа декораторов

Замыкание — это функция, которая «запоминает» переменные из внешней функции, даже после того как внешняя завершила работу.

```python
def make_multiplier(factor):
    def multiply(x):
        return x * factor   # factor — из внешней функции
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15
```

`multiply` — это замыкание: она помнит значение `factor`.

---

## Создание декоратора

Декоратор принимает функцию, создаёт обёртку (`wrapper`), добавляет в неё новое поведение, и возвращает обёртку.

```python
def my_decorator(func):
    def wrapper():
        print("До вызова функции")
        func()
        print("После вызова функции")
    return wrapper

def say_hello():
    print("Привет!")

# Применить декоратор вручную
say_hello = my_decorator(say_hello)

say_hello()
```

Вывод:
```
До вызова функции
Привет!
После вызова функции
```

---

## Синтаксис @

Знак `@` — это синтаксический сахар для `func = decorator(func)`. Он делает код чище.

```python
def my_decorator(func):
    def wrapper():
        print("До вызова функции")
        func()
        print("После вызова функции")
    return wrapper

@my_decorator   # эквивалентно: say_hello = my_decorator(say_hello)
def say_hello():
    print("Привет!")

say_hello()
```

Вывод тот же:
```
До вызова функции
Привет!
После вызова функции
```

---

## Декораторы с аргументами функции

Если декорируемая функция принимает аргументы, обёртка должна их принять и передать.

```python
def logger(func):
    def wrapper(*args, **kwargs):
        print(f"Вызов {func.__name__} с аргументами {args} {kwargs}")
        result = func(*args, **kwargs)
        print(f"Результат: {result}")
        return result
    return wrapper

@logger
def add(a, b):
    return a + b

@logger
def greet(name, greeting="Привет"):
    return f"{greeting}, {name}!"

add(3, 5)
greet("Иван")
greet("Мария", greeting="Добрый день")
```

Вывод:
```
Вызов add с аргументами (3, 5) {}
Результат: 8
Вызов greet с аргументами ('Иван',) {}
Результат: Привет, Иван!
Вызов greet с аргументами ('Мария',) {'greeting': 'Добрый день'}
Результат: Добрый день, Мария!
```

Использование `*args, **kwargs` в `wrapper` позволяет декоратору работать с **любой** функцией.

---

## functools.wraps

Декоратор заменяет оригинальную функцию на `wrapper`, из-за чего теряются имя и документация оригинала.

```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet():
    """Приветствует пользователя."""
    return "Привет!"

print(greet.__name__)   # wrapper  — неправильно!
print(greet.__doc__)    # None     — документация потеряна
```

Решение — `@functools.wraps(func)`:

```python
import functools

def my_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet():
    """Приветствует пользователя."""
    return "Привет!"

print(greet.__name__)   # greet   — правильно
print(greet.__doc__)    # Приветствует пользователя.
```

Всегда добавляйте `@functools.wraps` в декоратор — это хорошая практика.

---

## Несколько декораторов

Функцию можно украсить несколькими декораторами одновременно. Они применяются снизу вверх.

```python
import functools

def bold(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return "<b>" + func(*args, **kwargs) + "</b>"
    return wrapper

def italic(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return "<i>" + func(*args, **kwargs) + "</i>"
    return wrapper

@bold
@italic
def get_text():
    return "Привет"

print(get_text())   # <b><i>Привет</i></b>
```

`@bold @italic` означает: `bold(italic(get_text))`.

---

## Практические примеры

### Измерение времени выполнения

```python
import functools
import time

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} выполнилась за {end - start:.4f} сек.")
        return result
    return wrapper

@timer
def slow_sum(n):
    total = 0
    for i in range(n):
        total += i
    return total

slow_sum(1_000_000)
# slow_sum выполнилась за 0.0523 сек.
```

### Проверка типов аргументов

```python
import functools

def require_positive(*param_names):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(**kwargs):
            for name in param_names:
                if name in kwargs and kwargs[name] <= 0:
                    raise ValueError(f"Аргумент '{name}' должен быть положительным")
            return func(**kwargs)
        return wrapper
    return decorator

@require_positive("width", "height")
def create_rect(width, height):
    return width * height

print(create_rect(width=5, height=3))   # 15
create_rect(width=-1, height=3)          # ValueError
```

### Повторные попытки при ошибке

```python
import functools

def retry(times=3):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"Попытка {attempt} не удалась: {e}")
            print("Все попытки исчерпаны")
        return wrapper
    return decorator

@retry(times=3)
def unstable_function():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Нет соединения")
    return "Успех!"

print(unstable_function())
```

---

## Задание

1. Напишите декоратор `uppercase`, который преобразует строковый результат функции в верхний регистр.
   ```python
   @uppercase
   def get_name():
       return "иван петров"
   
   print(get_name())   # ИВАН ПЕТРОВ
   ```

2. Напишите декоратор `count_calls`, который считает, сколько раз была вызвана функция, и выводит это число после каждого вызова.

3. Напишите декоратор `validate_args`, который проверяет, что все аргументы функции — числа (тип `int` или `float`). Если нет — выводит ошибку и не вызывает функцию.

4. Напишите декоратор `cache` (упрощённый аналог `lru_cache`), который запоминает результаты вызовов с конкретными аргументами и при повторном вызове возвращает сохранённый результат без вычисления. Примените к рекурсивной функции Фибоначчи из прошлого урока.
