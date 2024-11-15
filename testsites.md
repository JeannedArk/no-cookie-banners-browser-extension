| Language | Website | Working | Mode | Note |
| -------- | ------- | ------- | -----| ---- |
| English | https://www.google.com/ | Y | | |
| English | https://www.gov.uk/ | Y | | |
| English | https://www.europarl.europa.eu/portal/en | Y | | |
| English | https://www.facebook.com/ | Y | | |
| English | https://www.vodafone.com/ | Y | | |
| English | https://developer.chrome.com/docs/webstore/publish | N | | |
| English | https://www.airbus.com/en/what-we-do/save-lives | Y | | |
| English | https://shop.samsung.com/ie/cookies | Y | | Redirecting 'a' tags need to be excluded |
| English | https://stackoverflow.com/ | Y | | |
| English | https://www.bbc.com/ | N | | Doesn't work yet because of the form layout |
| English | https://weather.com/ | N | | iFrame with different domain |
| German | https://www.google.de/ | Y | | |
| German | https://www.amazon.de/ | N | | Click event on the spans has no effect. The click event needs to be performed on the input child element. |
| German | https://www.mercedes-benz.ch/ | N | Nested Menu | Title is not a parent element |
| German | https://www.delica.com/ | Y | Nested Menu | |
| German | https://developer.chrome.com/docs/webstore/publish?hl=de | N | | |
| German | https://www.vodafone.de/ | Y | | |
| German | https://www.redhat.com/de | N | | iFrame with different domain |
| German | https://www.prodyna.com/de | N | | |
| German | https://www.canva.com/de_de | Y | Nested Menu | |
| German | https://fritz-kola.com/de | N | | |
| German | https://www.zalando.ch/ | N | | Title naming |
| Spanish | https://www.google.es/?hl=es | Y | | |
| French | https://www.google.fr/?hl=fr | Y | | |
| Dutch | https://www.hema.nl/ | N | | |

## Testing

The URLs can be extracted with the following command:
```bash
grep -o 'https\?://[^[:space:]|]*' testsites.md
```

and then opened in the browser with the 'Open Multiple URLs' Chrome extension.
