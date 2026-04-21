---
layout: lesson
title: "Урок 7: Логический тип (bool)"
order: 7
---
## Содержание

- [Тип bool](#тип-bool)
- [Операторы сравнения](#операторы-сравнения)
- [Логические операторы](#логические-операторы)
- [Истинность значений](#истинность-значений)
- [Приоритеты логических операций](#приоритеты-логических-операций)
- [Практические примеры](#практические-примеры)
- [Задание](#задание)

---

## Тип bool

`bool` — логический тип данных. Принимает только два значения:

```python
is_active = True
is_deleted = False

print(is_active)   # True
print(is_deleted)  # False
print(type(True))  # <class 'bool'>
```

`bool` является подтипом `int`: `True == 1` и `False == 0`.

```python
print(True + True)   # 2
print(True + False)  # 1
print(False * 10)    # 0
print(int(True))     # 1
print(int(False))    # 0
```

---

## Операторы сравнения

Операторы сравнения возвращают значение типа `bool`.

| Оператор | Описание | Пример | Результат |
|----------|----------|--------|-----------|
| `==` | Равно | `5 == 5` | `True` |
| `!=` | Не равно | `5 != 3` | `True` |
| `<` | Меньше | `3 < 5` | `True` |
| `>` | Больше | `5 > 3` | `True` |
| `<=` | Меньше или равно | `3 <= 3` | `True` |
| `>=` | Больше или равно | `5 >= 6` | `False` |

```python
a = 10
b = 5

print(a == b)   # False
print(a != b)   # True
print(a > b)    # True
print(a < b)    # False
print(a >= 10)  # True
print(b <= 3)   # False
```

### Сравнение строк

Строки сравниваются лексикографически (по алфавиту):

```python
print("apple" == "apple")   # True
print("apple" == "Apple")   # False (регистр важен)
print("banana" > "apple")   # True (b > a в алфавите)
print("abc" < "abd")        # True (сравнение посимвольно)
```

### Цепочки сравнений

Python позволяет записывать несколько сравнений подряд:

```python
age = 25

print(18 <= age <= 65)   # True (возраст между 18 и 65)
print(0 < age < 100)     # True

# Эквивалентная запись без цепочки:
print(age >= 18 and age <= 65)  # True
```

---

## Логические операторы

Python предоставляет три логических оператора: `and`, `or`, `not`.

### Оператор and (И)

Возвращает `True` только если **оба** условия истинны.

```python
x = True
y = False

print(x and y)   # False
print(x and x)   # True
print(y and y)   # False
```

Таблица истинности `and`:

| A | B | A and B |
|---|---|---------|
| True | True | True |
| True | False | False |
| False | True | False |
| False | False | False |

```python
age = 22
has_id = True

can_enter = age >= 18 and has_id
print(can_enter)  # True
```

### Оператор or (ИЛИ)

Возвращает `True` если хотя бы **одно** из условий истинно.

```python
x = True
y = False

print(x or y)    # True
print(x or x)    # True
print(y or y)    # False
```

Таблица истинности `or`:

| A | B | A or B |
|---|---|--------|
| True | True | True |
| True | False | True |
| False | True | True |
| False | False | False |

```python
is_weekend = True
is_holiday = False

can_rest = is_weekend or is_holiday
print(can_rest)  # True
```

### Оператор not (НЕ)

Инвертирует логическое значение.

```python
print(not True)   # False
print(not False)  # True
```

Таблица истинности `not`:

| A | not A |
|---|-------|
| True | False |
| False | True |

```python
is_raining = False
can_go_for_walk = not is_raining
print(can_go_for_walk)  # True
```

---

## Истинность значений

В Python любое значение можно использовать в логическом контексте. Это называется **truthy** (истинное) и **falsy** (ложное) значения.

**Falsy** (считаются `False`):

```python
print(bool(0))      # False
print(bool(0.0))    # False
print(bool(""))     # False (пустая строка)
print(bool(None))   # False
print(bool([]))     # False (пустой список)
```

**Truthy** (считаются `True`):

```python
print(bool(1))        # True
print(bool(-5))       # True (любое ненулевое число)
print(bool("hello"))  # True (непустая строка)
print(bool("0"))      # True (строка "0" — не пустая!)
```

Практический пример:

```python
username = ""

if username:
    print(f"Привет, {username}!")
else:
    print("Имя не введено")
# Имя не введено (пустая строка — falsy)
```

---

## Приоритеты логических операций

Операторы выполняются в следующем порядке (от высшего к низшему):

1. `not`
2. `and`
3. `or`

```python
print(True or False and False)
# True or (False and False) = True or False = True

print(not True or False)
# (not True) or False = False or False = False
```

Используйте скобки для ясности:

```python
age = 25
income = 50000
has_job = True

# Может получить кредит: возраст 21-65 И (доход > 30000 ИЛИ есть работа)
can_get_loan = (21 <= age <= 65) and (income > 30000 or has_job)
print(can_get_loan)  # True
```

---

## Практические примеры

### Проверка диапазона

```python
temperature = 22

is_comfortable = 18 <= temperature <= 26
print(f"Комфортная температура: {is_comfortable}")  # True
```

### Проверка нескольких условий

```python
username = "admin"
password = "secret123"

correct_user = username == "admin"
correct_pass = password == "secret123"
is_authenticated = correct_user and correct_pass

print(f"Вход выполнен: {is_authenticated}")  # True
```

### Логика скидок

```python
age = 65
is_student = False
has_coupon = True

gets_discount = age >= 60 or is_student or has_coupon
print(f"Скидка предоставляется: {gets_discount}")  # True
```

---

## Задание

1. Напишите выражения и проверьте их вывод:
   - `10 > 5 and 3 < 8`
   - `not (5 == 5)`
   - `True or False and False`
   - `"python" == "Python"`

2. Напишите программу с переменными `age = 20` и `balance = 1500`. Проверьте:
   - Возраст от 18 до 30 включительно
   - Баланс больше 1000
   - Оба условия одновременно
   - Хотя бы одно из двух условий

3. Напишите условие: пользователь может смотреть фильм, если ему больше 16 лет **или** с ним есть взрослый сопровождающий.

---

