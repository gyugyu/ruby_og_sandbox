require "execjs"

class ExecJS::ThenableNodeRuntime < ExecJS::ExternalRuntime
  def initialize(options)
    options.merge(runner_path: File.expand_path('thenable_node_runner.js'))
    super(options)
  end
end

module ExecJS::Runtimes
  ThenableNode = ExecJS::ThenableNodeRuntime.new(
    name:        "Node.js (V8)",
    command:     ["node", "nodejs"],
    runner_path: File.expand_path("thenable_node_runner.js"),
    encoding:    "UTF-8"
  )
end
