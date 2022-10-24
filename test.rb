require "base64"
require_relative "thenable_node"

path = File.expand_path("build.js")
context = ExecJS::Runtimes::ThenableNode.compile(File.read(path))

result = context.call("satori.run")

puts result

File.open('out.png', 'wb') do |f|
  f.write(Base64.strict_decode64(result))
end
