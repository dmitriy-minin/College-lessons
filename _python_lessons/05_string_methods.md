---
layout: lesson
title: "Урок 5: Методы строк"
order: 5
---
## Содержание

- [Что такое методы](#что-такое-методы)
- [upper() и lower()](#upper-и-lower)
- [strip()](#strip)
- [replace()](#replace)
- [Другие полезные методы](#другие-полезные-методы)
- [Цепочка методов](#цепочка-методов)
- [Задание](#задание)

---

## Что такое методы

Метод — это функция, которая принадлежит объекту. Вызывается через точку: `объект.метод()`.

```python
text = "hello"
result = text.upper()
print(result)  # HELLO
```

Строка `text` — это объект, `.upper()` — это метод строки. Методы не изменяют исходную строку, а **возвращают новую**.

```python
original = "hello"
modified = original.upper()

print(original)  # hello  (не изменилась)
print(modified)  # HELLO
```

---

## upper() и lower()

### upper() — в верхний регистр

Переводит все символы строки в верхний регистр.

```python
name = "иван"
print(name.upper())  # ИВАН

title = "python programming"
print(title.upper())  # PYTHON PROGRAMMING
```

### lower() — в нижний регистр

Переводит все символы строки в нижний регистр.

```python
name = "АЛЕКСЕЙ"
print(name.lower())  # алексей

email = "User@Example.COM"
print(email.lower())  # user@example.com
```

### Практическое применение

Сравнение строк без учёта регистра:

```python
user_input = "PYTHON"
correct = "python"

if user_input.lower() == correct.lower():
    print("Правильно!")
```

Форматирование имён:

```python
raw_name = "иВаН пЕтРоВ"
print(raw_name.lower())   # иван петров
print(raw_name.upper())   # ИВАН ПЕТРОВ
```

### capitalize() и title()

Два похожих метода:

```python
text = "привет мир"

print(text.capitalize())  # Привет мир (только первая буква)
print(text.title())       # Привет Мир (первая буква каждого слова)
```

---

## strip()

Удаляет пробелы (и другие пробельные символы) с начала и конца строки.

```python
text = "   Привет, мир!   "
print(text.strip())   # "Привет, мир!"

text_with_newlines = "\n\nтекст\n\n"
print(text_with_newlines.strip())  # "текст"
```

### Варианты strip()

| Метод | Описание |
|-------|----------|
| `strip()` | Удаляет пробелы с обеих сторон |
| `lstrip()` | Удаляет пробелы только слева |
| `rstrip()` | Удаляет пробелы только справа |

```python
text = "   пробелы с двух сторон   "

print(text.lstrip())  # "пробелы с двух сторон   "
print(text.rstrip())  # "   пробелы с двух сторон"
print(text.strip())   # "пробелы с двух сторон"
```

### Удаление конкретных символов

`strip()` может удалять и другие символы, не только пробелы:

```python
text = "###важное сообщение###"
print(text.strip("#"))  # "важное сообщение"

url = "https://example.com/"
print(url.strip("/"))   # "https://example.com"
```

### Практическое применение

Обработка пользовательского ввода:

```python
user_input = "  ivan@example.com  "
clean_email = user_input.strip().lower()
print(clean_email)  # "ivan@example.com"
```

---

## replace()

Заменяет все вхождения одной подстроки на другую.

Синтаксис: `строка.replace(что_заменить, на_что_заменить)`

```python
text = "Я люблю кофе"
new_text = text.replace("кофе", "чай")
print(new_text)  # Я люблю чай

text = "a-b-c-d"
print(text.replace("-", ""))   # abcd
print(text.replace("-", " "))  # a b c d
```

### Ограничение числа замен

Третий аргумент задаёт максимальное количество замен:

```python
text = "aa bb aa cc aa"
print(text.replace("aa", "XX", 2))  # XX bb XX cc aa (заменено только 2 раза)
```

### Практическое применение

Очистка текста от лишних символов:

```python
phone = "+7 (999) 123-45-67"
digits_only = phone.replace(" ", "").replace("(", "").replace(")", "").replace("-", "")
print(digits_only)  # +79991234567
```

Замена в шаблонах:

```python
template = "Уважаемый ИМЯPOLZOVATELYA, ваш заказ NOMER_ZAKAZA готов."
message = template.replace("ИМЯPOLZOVATELYA", "Иван").replace("NOMER_ZAKAZA", "12345")
print(message)
# Уважаемый Иван, ваш заказ 12345 готов.
```

---

## Другие полезные методы

### find() и index() — поиск подстроки

```python
text = "Hello, World"

print(text.find("World"))    # 7 (индекс начала подстроки)
print(text.find("Python"))   # -1 (не найдено)
print(text.index("World"))   # 7 (как find, но вызывает ошибку если не найдено)
```

### count() — количество вхождений

```python
text = "banana"
print(text.count("a"))   # 3
print(text.count("an"))  # 2
```

### startswith() и endswith() — проверка начала и конца

```python
filename = "report_2024.pdf"

print(filename.startswith("report"))  # True
print(filename.endswith(".pdf"))       # True
print(filename.endswith(".docx"))      # False
```

### split() — разбивка на список

```python
text = "яблоко,груша,банан"
fruits = text.split(",")
print(fruits)  # ['яблоко', 'груша', 'банан']

sentence = "Python это круто"
words = sentence.split()  # без аргумента — разбивает по пробелам
print(words)  # ['Python', 'это', 'круто']
```

### join() — объединение списка в строку

```python
words = ["Привет", "мир"]
result = " ".join(words)
print(result)  # "Привет мир"

items = ["яблоко", "груша", "банан"]
print(", ".join(items))  # "яблоко, груша, банан"
```

---

## Цепочка методов

Методы можно вызывать последовательно — один за другим:

```python
text = "  Hello, World!  "

result = text.strip().lower().replace("world", "Python")
print(result)  # "hello, python!"
```

Цепочка выполняется слева направо:

1. `text.strip()` → `"Hello, World!"`
2. `.lower()` → `"hello, world!"`
3. `.replace("world", "Python")` → `"hello, Python!"`

---

## Задание

1. Дана строка `"  привет, МИР!  "`. Примените методы так, чтобы получить `"Привет, мир!"`.
2. Дана строка `"2024-01-15"`. Замените `-` на `.` и выведите `"2024.01.15"`.
3. Напишите программу, которая:
   - Принимает строку `"  User@EXAMPLE.com  "`
   - Удаляет пробелы
   - Переводит в нижний регистр
   - Проверяет, заканчивается ли на `.com`
   - Выводит результат и ответ на проверку

**Ожидаемый вывод:**

```
Очищенный email: user@example.com
Заканчивается на .com: True
```

---


