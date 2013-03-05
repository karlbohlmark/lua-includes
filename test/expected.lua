function key(sub) do
  return 'base-name' .. sub
end


function update(filename) do
  redis.call('incr', key(filename))
end


local filename = ARGS[1]
update(filename)
