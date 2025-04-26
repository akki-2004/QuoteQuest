import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
import os
import json

class QuoteCategorySpider(CrawlSpider):
    name = "mycrawler"
    allowed_domains = ["quotes.toscrape.com"]
    start_urls = ["https://quotes.toscrape.com/"]
    quotes_by_tag = {}

    rules = (
        Rule(LinkExtractor(allow=r'/page/\d+/'), callback='parse_quotes', follow=True),
        Rule(LinkExtractor(allow=r'/tag/'), callback='parse_quotes', follow=True),
    )

    def parse_quotes(self, response):
        for quote in response.css('div.quote'):
            quote_text = quote.css('span.text::text').get()
            author = quote.css('small.author::text').get()
            tags = quote.css('div.tags a.tag::text').getall()
            for tag in tags:
                if tag not in self.quotes_by_tag:
                    self.quotes_by_tag[tag] = []
                self.quotes_by_tag[tag].append({
                    'text': quote_text,
                    'author': author,
                    'tags': tags
                })

        yield {
            'text': quote_text,
            'author': author,
            'tags': tags
        }

    def closed(self, reason):
        # When crawling is done, save quotes by tags
        if not os.path.exists('quotes_by_category'):
            os.makedirs('quotes_by_category')

        for tag, quotes in self.quotes_by_tag.items():
            filename = f'quotes_by_category/{tag}_quotes.json'
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(quotes, f, ensure_ascii=False, indent=4)

        print(f"Saved all quotes organized by category in 'quotes_by_category/' folder!")
