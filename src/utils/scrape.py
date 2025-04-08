import requests
from bs4 import BeautifulSoup
import pandas as pd
import re

base_url= "https://www.backmarket.com/en-us"
sites = ['backmarket']

def extract_data(soup,category):
    # Extract the data you need from the soup object
    items = []
    product_cards = soup.find_all('div', class_='bg-float-default-low shadow-short rounded-lg focus-within:shadow-middle hover:bg-float-default-low-hover hover:shadow-middle h-full cursor-pointer overflow-hidden text-left hover:shadow-long')
    for card in product_cards:
        name = card.find('div', class_='flex flex-col gap-2').text.strip()
        price = card.find('div', class_='text-static-default-hi body-2-bold').text.strip()
        image = re.search(r'https://[^\s]+',(card.find('img', class_='h-auto max-h-full max-w-full leading-none')['src'])).group()
        items.append({
            'name': name,
            'price': price,
            'image': image,
            'category': category
        })
    return items

all_items = []

urls = {
    "phones": "https://www.backmarket.com/en-us/l/iphone/e8724fea-197e-4815-85ce-21b8068020cc?p=",
    "laptops": "https://www.backmarket.com/en-us/l/windows-laptops/95d6f541-323f-4e25-bc85-5f567700354b?p=",
    "tablets": "https://www.backmarket.com/en-us/l/apple-ipad/f78ae8f5-4611-4ad0-b2ad-ced07765b847?p=",
    "consoles": "https://www.backmarket.com/en-us/l/sony-playstation/dcbd8534-a5cd-4df0-9d54-dc80814fbcf6?p=",
    "audio": "https://www.backmarket.com/en-us/l/speakers/10c6b0bb-9d00-4f82-b5bd-31b5df80a2dc?p=",
}

phonepage, laptoppage, tabletpage, consolepage, audiopage = None, None, None, None, None
products = []
# Fetch and parse the content for each category
for category, url in urls.items():
    for i in range(0, 5):
        response = requests.get(url + str(i))
        soup = BeautifulSoup(response.content, 'html.parser')
        print(f"Fetched content from {url + str(i)}")

        # Store the parsed content in the respective variable
        if category == "phones":
            phonepage = soup
            items = extract_data(soup,category)
            all_items.extend(items)
            product_cards = soup.find_all('div', class_='bg-float-default-low shadow-short rounded-lg focus-within:shadow-middle hover:bg-float-default-low-hover hover:shadow-middle h-full cursor-pointer overflow-hidden text-left hover:shadow-long')
            for card in product_cards:
                product = {
                    'name': card.find('h2').text,
                    'price': card.find('div', class_='text-static-default-hi body-2-bold').text,
                    'image': re.search(r'https://[^\s]+',(card.find('img', class_='h-auto max-h-full max-w-full leading-none')['src'])).group(),
                    'url': base_url + card.find('a')['href'],
                    'category': items[0]['category']
                }
                products.append(product)

        elif category == "laptops":
            laptoppage = soup
            items = extract_data(soup,category)
            all_items.extend(items)
            product_cards = soup.find_all('div', class_='bg-float-default-low shadow-short rounded-lg focus-within:shadow-middle hover:bg-float-default-low-hover hover:shadow-middle h-full cursor-pointer overflow-hidden text-left hover:shadow-long')
            for card in product_cards:
                product = {
                    'name': card.find('h2').text,
                    'price': card.find('div', class_='text-static-default-hi body-2-bold').text,
                    'image': re.search(r'https://[^\s]+',(card.find('img', class_='h-auto max-h-full max-w-full leading-none')['src'])).group(),
                    'url': base_url + card.find('a')['href'],
                    'category': items[0]['category']
                }
                products.append(product)

        elif category == "tablets":
            tabletpage = soup
            items = extract_data(soup,category)
            all_items.extend(items)
            product_cards = soup.find_all('div', class_='bg-float-default-low shadow-short rounded-lg focus-within:shadow-middle hover:bg-float-default-low-hover hover:shadow-middle h-full cursor-pointer overflow-hidden text-left hover:shadow-long')
            for card in product_cards:
                product = {
                    'name': card.find('h2').text,
                    'price': card.find('div', class_='text-static-default-hi body-2-bold').text,
                    'image': re.search(r'https://[^\s]+',(card.find('img', class_='h-auto max-h-full max-w-full leading-none')['src'])).group(),
                    'url': base_url + card.find('a')['href'],
                    'category': items[0]['category']
                }
                products.append(product)

        elif category == "consoles":
            consolepage = soup
            items = extract_data(soup,category)
            all_items.extend(items)
            product_cards = soup.find_all('div', class_='bg-float-default-low shadow-short rounded-lg focus-within:shadow-middle hover:bg-float-default-low-hover hover:shadow-middle h-full cursor-pointer overflow-hidden text-left hover:shadow-long')
            for card in product_cards:
                product = {
                    'name': card.find('h2').text,
                    'price': card.find('div', class_='text-static-default-hi body-2-bold').text,
                    'image': re.search(r'https://[^\s]+',(card.find('img', class_='h-auto max-h-full max-w-full leading-none')['src'])).group(),
                    'url': base_url + card.find('a')['href'],
                    'category': items[0]['category']
                }
                products.append(product)

        elif category == "tvs":
            tvpage = soup
            items = extract_data(soup,category)
            all_items.extend(items)
            product_cards = soup.find_all('div', class_='bg-float-default-low shadow-short rounded-lg focus-within:shadow-middle hover:bg-float-default-low-hover hover:shadow-middle h-full cursor-pointer overflow-hidden text-left hover:shadow-long')
            for card in product_cards:
                product = {
                    'name': card.find('h2').text,
                    'price': card.find('div', class_='text-static-default-hi body-2-bold').text,
                    'image': re.search(r'https://[^\s]+',(card.find('img', class_='h-auto max-h-full max-w-full leading-none')['src'])).group(),
                    'url': base_url + card.find('a')['href'],
                    'category': items[0]['category']
                }
                products.append(product)

        elif category == "audio":
            audiopage = soup
            items = extract_data(soup,category)
            all_items.extend(items)
            product_cards = soup.find_all('div', class_='bg-float-default-low shadow-short rounded-lg focus-within:shadow-middle hover:bg-float-default-low-hover hover:shadow-middle h-full cursor-pointer overflow-hidden text-left hover:shadow-long')
            for card in product_cards:
                product = {
                    'name': card.find('h2').text,
                    'price': card.find('div', class_='text-static-default-hi body-2-bold').text,
                    'image': re.search(r'https://[^\s]+',(card.find('img', class_='h-auto max-h-full max-w-full leading-none')['src'])).group(),
                    'url': base_url + card.find('a')['href'],
                    'category': items[0]['category']
                }
                products.append(product)
            

df = pd.DataFrame(products)
df.to_excel('products.xlsx', index=False)
print("Excel file has been generated as products.xlsx")

# Example: Print the title of each page to verify the content
print("Phone Page Title:", phonepage.title.string if phonepage else "No content")
print("Laptop Page Title:", laptoppage.title.string if laptoppage else "No content")
print("Tablet Page Title:", tabletpage.title.string if tabletpage else "No content")
print("Console Page Title:", consolepage.title.string if consolepage else "No content")
print("Audio Page Title:", audiopage.title.string if audiopage else "No content")

