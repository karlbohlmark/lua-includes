# lua-include

 Modularize you redis lua scripts

## Installation

```bash
$ npm install lua-include
```

### Example

redis-cmd.lua:
```lua
-- #include ./tweet.lua

redis.call('set', 'key', 'value')
tweet('I just set a value in redis')
```

tweet.lua:
```lua
function tweet(msg) do
  redis.call('lpush', 'tweets', msg)
end
```

### Usage

```bash
$ lua-include -o output.lua redis-cmd.lua
```

output.lua:

```lua
function tweet(msg) do
  redis.call('lpush', 'tweets', msg)
end

redis.call('set', 'key', 'value')
tweet('I just set a value in redis')

```