import urllib3

http = urllib3.PoolManager()

r = http.request(
    'POST',
    'http://httpbin.org/post',
    fields = {'hello': 'world'}
    )

print(r.data)
