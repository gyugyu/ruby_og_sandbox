#require "execjs"
#
#puts ExecJS.runtime.name
#
path = File.expand_path("build.js")

#context = ExecJS.compile(File.read(path))
#puts context.call("satori.run", bare: true)
#while true
#  sleep 1
#  puts context.call("satori.getResult", bare: true)
#end
#

require_relative "thenable_node"

context = ExecJS::Runtimes::ThenableNode.compile(File.read(path))

puts context.call("satori.run")
