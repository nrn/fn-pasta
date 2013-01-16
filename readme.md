Functional Pasta
================

A collection of functional functions that I have found myself copy pastaing around.

I am trying to separate the pasta into useful strands.

comp(arr)
---------

Turn array (or arguments) of functions into a single function
that feeds the return value of one into the next.

partial(fn, [args, ...])
------------------------

Return fn with arguments applied. Blank spots are held for nulls.

limit(num)
----------

Return a function that takes a fn and limits it to the number of args provided.

casify(obj[, default])
----------------------

Return a function that takes a case and checks to see if it is in obj.
If not use the default, if not use the \_default property of the object,
if not use the default property of the object.

op(operator)
------------

Returns a function that applies the operator to the arguments.

d(arg)
------

return arg.  An identity function. Also op('').

get(key)
--------

Returns a function that gets key from the object it is called on.

