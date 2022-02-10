import requests 

r = requests.post("https://freeimage.host/api/1/upload",files = {'source': open('test_img.png', 'rb')},data={'key':'6d207e02198a847aa98d0a2a901485a5','action':'upload'})
print(r.status_code)
print(r.text)