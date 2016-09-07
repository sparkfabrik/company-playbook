
This document want's to be a short help to use when you encounter a problem while developing or
building a Drupal base application.

The typical scenarios are, for example:
* you upgraded a module and now you have an error
* you are developing or changing a module usin an API but it is not working as expected
* you changed something somewhere and you have an error

The following steps should be done before asking help to one of your colleagues.

* **do not panic**: you will sort it out! I know you are loosing time, but this can be an opportunity to learn interesting things

* **stay focussed**: if you have an error messager read it carefully. Try to understand it before starting googoling the entire message. What is it saying? Missing file? Missing Class? Syntax error? Try to identify some keywords that are representative for you error (a class name, filename, module, strip out the message from local content type names, varibles that are only on you app)

* **discover**: if you do not have an error message, look at the logs. Drupal logs, php error log, apache error log, or any other logs created by your app. Search the code using your editor to identify which module, files or classes are printing your error.

* **look around**: the first place to search is drupal.org, every module has it's own issue tracker. Use it to search for issues or comments talking about the class, the file or the error message you are getting from drupal. Do not copy and paste the entire error but only the class name or the file or a part of the error that is generic and not related to your system (for example /home/giaco/drupal is to be avoided!)
Read the issues you find entirely, not just the body, but also the comments. If the are very long search in the page for youy keywords.
Than you can search on google, also stackoverflow is full of opinions about php and drupal.

* **dig**: if you are not lucky enough to find a patch or a solution during the previous steps, you have to dig.
Open the code and try to figure out what is it doing. Read readme files and comments. Dump methods or function names to check if they are called, dump variables. Backtrace to find out what is invoked before the error, debug_backtrace is your friend.

* **dismantle**: if you are still in trouble, you have now to start isolating the problem, disabling one by one everything that is not closely related to the error. Third party services, themes, modules. Disable alters or functions and try to locate the problem.

* **call home**: if you are asking for help, start with asking on a chat channel, provide precise and complete informations. If one of your colleagues can help you, just ask for a call or a meeting when he will be available

