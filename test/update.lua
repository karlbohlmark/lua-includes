-- #include ./key.lua

function update(filename) do
  redis.call('incr', key(filename))
end
