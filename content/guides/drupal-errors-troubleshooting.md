
This is intended as a sort of panic plan for when you encounter a problem while developing or building a Drupal based application.

The typical scenarios are, for example:

* you upgraded a module and you now have an error
* you are developing or changing a module using an API but it is not working as expected
* you changed something somewhere and errors spours

The following steps should be done before asking for help from one of your colleagues:

* **Do not panic**: you will sort it out! I know it seems you are losing time, but please, see this as an opportunity to learn interesting things and improve your autonomy and independence.

* **Stay focused**: if you have an error message, read it **carefully**. Try to understand its meaning before copying and pasting the entire message into Google. What does it talk about? Missing file? Missing Class? Syntax error? Try to identify some keywords that can head you to the problem source (a class name, filename, module?) strip out the message from context-dependent parts (content-type names, variables, file positions) which are only local to your environment and will pollute your searches heading to poor results!

* **Discover**: if you do not have an error message, look at the logs. Drupal logs, PHP error log, Apache error log, or any other logs created by your app. Search the code using your editor (in addition, learn regex, it helps a lot) to identify which module, files or classes are printing your error.

* **Look around**: the first place to search is drupal.org: every module has its own issue tracker. Use it to search for issues or comments talking about the class, the file or the error message you are getting from Drupal. Again: *do not copy and paste the entire error* but only the class name or the file or a part of the error that is generic and not related to your system (for example `/home/yourname/drupal` seems a great candidate for the stripping!) Read the issues you find entirely, not just the body, but also the comments. If they are very long keep up and be patient and focused. If the comments seem to derail off-topic search on the page for meaningful keywords. If you can't find a solution, only then you can search on Google. StackOverflow is another great source of solutions and knowledge about PHP and Drupal.

* **Dig**: if you are not lucky enough to find a patch or a solution during the previous steps, you have to dig. Open the code and try to figure out what it is doing. Read readme files and comments. Dump methods or function names to check if they are called, dump variables to check what they contain (hint: see `dump()` below). Backtrace your function calls (hint: see `xdebug` below) to find out what is invoked before the error: `debug_backtrace()` is your best friend.

* **Dismantle**: if you are still in trouble, you now have to start isolating the problem, disabling every part of your code (or modules, themes, etc) that is not closely related to the error. Disable parts one by one, until the error disappears or you end up with nothing more to disable: third-party services, themes, modules... whatever. Disable custom alters or hooks, neutralize functions (i.e. force good return values) and try to locate where the root cause belongs.

* **Call home**: if you are asking for help, start by asking on a chat channel: try to state the problems as "expected outcome vs current outcome", providing the steps to reproduce the error. If one of your colleagues can help you, just ask for a call or a meeting whenever they will be available.

## Useful resources

* The VarDumper Symfony component provides the great `dump()` inspection function: http://symfony.com/doc/current/components/var_dumper.html
* XDebug extension for PHP allows for deep digging of your problems: https://xdebug.org/docs/  
In particular backtraces, functions provide you with the context/calls that led to the error: https://xdebug.org/docs/trace