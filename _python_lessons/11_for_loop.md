---
layout: lesson
title: "Урок 11: Цикл for"
order: 10
---
## Содержание

- [Цикл for vs while](#цикл-for-vs-while)
- [Синтаксис for](#синтаксис-for)
- [Функция range()](#функция-range)
- [Итерация по строке](#итерация-по-строке)
- [Итерация по списку](#итерация-по-списку)
- [Функции enumerate() и zip()](#функции-enumerate-и-zip)
- [Вложенные циклы for](#вложенные-циклы-for)
- [Практические примеры](#практические-примеры)
- [Задание](#задание)

---

## Цикл for vs while

| Цикл | Когда использовать |
|------|--------------------|
| `while` | Количество итераций заранее неизвестно |
| `for` | Перебираем конкретную последовательность или диапазон |

`for` лаконичнее и чаще встречается в Python-коде.

---

## Синтаксис for

Цикл `for` перебирает элементы последовательности один за другим.

```python
for переменная in последовательность:
    # тело цикла
```

```python
fruits = ["яблоко", "банан", "вишня"]

for fruit in fruits:
    print(fruit)
```

Вывод:
```
яблоко
банан
вишня
```

На каждой итерации переменная `fruit` принимает следующее значение из списка. После перебора всех элементов цикл завершается.

---

## Функция range()

`range()` генерирует последовательность чисел. Это основной инструмент для циклов с заданным числом итераций.

### range(stop)

Числа от `0` до `stop - 1`.

```python
for i in range(5):
    print(i)
# 0 1 2 3 4
```

### range(start, stop)

Числа от `start` до `stop - 1`.

```python
for i in range(1, 6):
    print(i)
# 1 2 3 4 5
```

### range(start, stop, step)

Числа от `start` до `stop - 1` с шагом `step`.

```python
for i in range(0, 20, 5):
    print(i)
# 0 5 10 15

for i in range(10, 0, -1):
    print(i)
# 10 9 8 7 6 5 4 3 2 1
```

### Сравнение вариантов range()

```python
range(5)          # 0, 1, 2, 3, 4
range(1, 5)       # 1, 2, 3, 4
range(0, 10, 2)   # 0, 2, 4, 6, 8
range(10, 0, -2)  # 10, 8, 6, 4, 2
```

### range() в операциях

```python
# Сумма чисел от 1 до 100
total = 0
for i in range(1, 101):
    total += i

print(total)  # 5050

# Таблица умножения на 7
for i in range(1, 11):
    print(f"7 × {i} = {7 * i}")
```

---

## Итерация по строке

Строка — это тоже последовательность. `for` перебирает её посимвольно.

```python
word = "Python"

for char in word:
    print(char)
```

Вывод:
```
P
y
t
h
o
n
```

Практический пример — подсчёт гласных:

```python
text = "Hello, World!"
vowels = "aeiouAEIOU"
count = 0

for char in text:
    if char in vowels:
        count += 1

print(f"Гласных букв: {count}")  # 3
```

---

## Итерация по списку

```python
numbers = [10, 25, 3, 47, 8]
total = 0

for num in numbers:
    total += num

print(f"Сумма: {total}")     # 93
print(f"Среднее: {total / len(numbers)}")  # 18.6
```

---

## Функции enumerate() и zip()

### enumerate() — элемент и его индекс

Когда нужен и сам элемент, и его порядковый номер.

```python
fruits = ["яблоко", "банан", "вишня"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
```

Вывод:
```
0: яблоко
1: банан
2: вишня
```

Счёт можно начать не с нуля:

```python
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")
# 1. яблоко
# 2. банан
# 3. вишня
```

### zip() — параллельный перебор двух списков

```python
names = ["Иван", "Мария", "Алексей"]
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name}: {score}")
```

Вывод:
```
Иван: 85
Мария: 92
Алексей: 78
```

---

## Вложенные циклы for

Цикл внутри цикла. Внутренний цикл выполняется полностью на каждой итерации внешнего.

```python
for i in range(1, 4):
    for j in range(1, 4):
        print(f"({i},{j})", end=" ")
    print()
```

Вывод:
```
(1,1) (1,2) (1,3)
(2,1) (2,2) (2,3)
(3,1) (3,2) (3,3)
```

Таблица умножения:

```python
for i in range(1, 11):
    for j in range(1, 11):
        print(f"{i * j:4}", end="")
    print()
```

Треугольник из звёздочек:

```python
for i in range(1, 6):
    print("*" * i)
```

Вывод:
```
*
**
***
****
*****
```

---

## Практические примеры

### Поиск максимального элемента

```python
numbers = [3, 17, 5, 42, 8, 1]
maximum = numbers[0]

for num in numbers:
    if num > maximum:
        maximum = num

print(f"Максимум: {maximum}")  # 42
```

### Переворот строки посимвольно

```python
word = "Python"
reversed_word = ""

for char in word:
    reversed_word = char + reversed_word

print(reversed_word)  # nohtyP
```

### FizzBuzz

```python
for i in range(1, 31):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
```

---

## Задание

1. Выведите квадраты чисел от 1 до 10 в формате `1^2 = 1`, `2^2 = 4` и т.д.

2. Напишите программу, которая принимает список оценок и выводит только те, что выше 7:
   ```python
   grades = [5, 8, 3, 9, 7, 10, 4, 6]
   ```

3. Используя вложенные циклы, выведите треугольник из чисел:
   ```
   1
   1 2
   1 2 3
   1 2 3 4
   1 2 3 4 5
   ```

4. С помощью `enumerate()` выведите нумерованный список:
   ```python
   tasks = ["Написать тесты", "Сделать ревью", "Задеплоить"]
   ```
   ```
   Задача 1: Написать тесты
   Задача 2: Сделать ревью
   Задача 3: Задеплоить
   ```

