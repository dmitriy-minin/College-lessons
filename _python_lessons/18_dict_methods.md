---
layout: lesson
title: "Урок 18: Методы словарей"
order: 18
---
## Содержание

- [get() — безопасный доступ](#get--безопасный-доступ)
- [keys() — все ключи](#keys--все-ключи)
- [values() — все значения](#values--все-значения)
- [items() — все пары](#items--все-пары)
- [Дополнительные методы](#дополнительные-методы)
- [Практические примеры](#практические-примеры)
- [Задание](#задание)

---

## get() — безопасный доступ

Метод `get()` возвращает значение по ключу. Если ключ отсутствует — возвращает `None` или указанное значение по умолчанию, без исключения.

```python
get(key, default=None)
```

```python
person = {"name": "Иван", "age": 25}

# Обычное обращение — KeyError при отсутствии ключа
print(person["name"])    # Иван
# print(person["city"]) # KeyError!

# get() — безопасно
print(person.get("name"))           # Иван
print(person.get("city"))           # None
print(person.get("city", "Москва")) # Москва (значение по умолчанию)
```

### Когда использовать get()

Всегда, когда ключ может отсутствовать:

```python
config = {"debug": True, "port": 8080}

# Получить значение или дефолт
host = config.get("host", "localhost")
port = config.get("port", 80)
debug = config.get("debug", False)

print(f"http://{host}:{port} (debug={debug})")
# http://localhost:8080 (debug=True)
```

### Паттерн: счётчик с get()

```python
text = "абракадабра"
frequency = {}

for char in text:
    frequency[char] = frequency.get(char, 0) + 1

print(frequency)
# {'а': 5, 'б': 2, 'р': 2, 'к': 1, 'д': 1}
```

---

## keys() — все ключи

Возвращает объект `dict_keys` — представление всех ключей словаря. Обновляется автоматически при изменении словаря.

```python
person = {"name": "Иван", "age": 25, "city": "Москва"}

keys = person.keys()
print(keys)   # dict_keys(['name', 'age', 'city'])
```

Можно перебирать напрямую или преобразовать в список:

```python
for key in person.keys():
    print(key)
# name
# age
# city

keys_list = list(person.keys())
print(keys_list)   # ['name', 'age', 'city']
```

Проверка наличия ключа:

```python
if "age" in person.keys():
    print("Возраст указан")
# Короче: if "age" in person:
```

---

## values() — все значения

Возвращает объект `dict_values` со всеми значениями.

```python
scores = {"Иван": 85, "Мария": 92, "Алексей": 78}

values = scores.values()
print(values)   # dict_values([85, 92, 78])
```

Применение:

```python
# Сумма и среднее
total = sum(scores.values())
average = total / len(scores)
print(f"Среднее: {average:.1f}")   # Среднее: 85.0

# Максимальное и минимальное
print(f"Лучший: {max(scores.values())}")   # 92
print(f"Худший: {min(scores.values())}")   # 78

# Проверка, есть ли нужное значение
print(92 in scores.values())    # True
print(100 in scores.values())   # False
```

---

## items() — все пары

Возвращает объект `dict_items` — набор кортежей `(ключ, значение)`.

```python
capitals = {"Россия": "Москва", "Франция": "Париж"}

items = capitals.items()
print(items)   # dict_items([('Россия', 'Москва'), ('Франция', 'Париж')])
```

Самый частый способ перебора словаря:

```python
for country, capital in capitals.items():
    print(f"{country} → {capital}")
# Россия → Москва
# Франция → Париж
```

Поиск ключа по значению:

```python
capitals = {"Россия": "Москва", "Франция": "Париж", "Германия": "Берлин"}
search_value = "Париж"

for country, capital in capitals.items():
    if capital == search_value:
        print(f"Столица {search_value} — {country}")
        break
# Столица Париж — Франция
```

---

## Дополнительные методы

### setdefault() — получить или установить

Возвращает значение ключа. Если ключ отсутствует — устанавливает его с указанным дефолтным значением.

```python
person = {"name": "Иван"}

# Ключ есть — возвращает существующее значение, ничего не меняет
age = person.setdefault("name", "Неизвестно")
print(age)      # Иван
print(person)   # {'name': 'Иван'}

# Ключа нет — создаёт с дефолтным значением
city = person.setdefault("city", "Москва")
print(city)     # Москва
print(person)   # {'name': 'Иван', 'city': 'Москва'}
```

`setdefault()` удобен для группировки данных:

```python
words = ["яблоко", "банан", "абрикос", "берёза", "виноград"]
by_letter = {}

for word in words:
    letter = word[0]
    by_letter.setdefault(letter, []).append(word)

print(by_letter)
# {'я': ['яблоко'], 'б': ['банан', 'берёза'], 'а': ['абрикос'], 'в': ['виноград']}
```

### update() — обновить из другого словаря

```python
defaults = {"color": "синий", "size": "M", "qty": 1}
custom = {"color": "красный", "qty": 3}

defaults.update(custom)
print(defaults)
# {'color': 'красный', 'size': 'M', 'qty': 3}
```

### pop() — удалить и вернуть

```python
person = {"name": "Иван", "age": 25, "city": "Москва"}

city = person.pop("city")
print(city)     # Москва
print(person)   # {'name': 'Иван', 'age': 25}

# С дефолтом — нет ошибки при отсутствии ключа
result = person.pop("phone", "не указан")
print(result)   # не указан
```

### copy() — поверхностная копия

```python
original = {"a": 1, "b": 2}
copy = original.copy()

copy["c"] = 3
print(original)   # {'a': 1, 'b': 2}
print(copy)       # {'a': 1, 'b': 2, 'c': 3}
```

---

## Практические примеры

### Инвертирование словаря

```python
capitals = {"Россия": "Москва", "Франция": "Париж", "Германия": "Берлин"}

inverted = {}
for country, capital in capitals.items():
    inverted[capital] = country

print(inverted)
# {'Москва': 'Россия', 'Париж': 'Франция', 'Берлин': 'Германия'}
```

### Объединение двух словарей

```python
dict1 = {"a": 1, "b": 2}
dict2 = {"b": 20, "c": 3}

# Способ 1: update
merged = dict1.copy()
merged.update(dict2)

# Способ 2: оператор | (Python 3.9+)
merged = dict1 | dict2

print(merged)   # {'a': 1, 'b': 20, 'c': 3}
```

### Фильтрация словаря

```python
scores = {"Иван": 45, "Мария": 82, "Алексей": 91, "Зина": 60, "Борис": 38}

passed = {}
for name, score in scores.items():
    if score >= 60:
        passed[name] = score

print(passed)   # {'Мария': 82, 'Алексей': 91, 'Зина': 60}
```

### Статистика текста

```python
text = "Это простой текст для простого примера"
words = text.lower().split()

word_count = {}
for word in words:
    word_count[word] = word_count.get(word, 0) + 1

# Вывод по убыванию частоты
for word, count in sorted(word_count.items(), key=lambda x: x[1], reverse=True):
    print(f"{word}: {count}")
```

---

## Задание

1. Дан словарь `{"a": 1, "b": 2, "c": 3}`. Используя `items()`, выведите каждую пару в формате `ключ -> значение`.

2. Дан список оценок студентов:
   ```python
   scores = {"Алексей": 85, "Мария": 92, "Иван": 78, "Зина": 95, "Борис": 60}
   ```
   С помощью `values()` найдите: среднюю оценку, количество студентов, сдавших выше 80.

3. Напишите программу, которая подсчитывает количество каждой буквы в строке `"hello world"`, используя `get()`. Выведите только те буквы, которые встречаются более одного раза.

4. Создайте словарь конфигурации с ключами `host`, `port`, `debug`. Используйте `get()` для безопасного получения значений, подставляя дефолты: `localhost`, `8080`, `False`.

