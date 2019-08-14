libdoc = {
	"all_tags": [],
	"contains_tags": False,
	"doc": "<p>A test library for string manipulation and verification.\x3c/p>\n<p><code>String\x3c/code> is Robot Framework's standard library for manipulating strings (e.g. <a href=\"#Replace%20String%20Using%20Regexp\" class=\"name\">Replace String Using Regexp\x3c/a>, <a href=\"#Split%20To%20Lines\" class=\"name\">Split To Lines\x3c/a>) and verifying their contents (e.g. <a href=\"#Should%20Be%20String\" class=\"name\">Should Be String\x3c/a>).\x3c/p>\n<p>Following keywords from <code>BuiltIn\x3c/code> library can also be used with strings:\x3c/p>\n<ul>\n<li><span class=\"name\">Catenate\x3c/span>\x3c/li>\n<li><span class=\"name\">Get Length\x3c/span>\x3c/li>\n<li><span class=\"name\">Length Should Be\x3c/span>\x3c/li>\n<li><span class=\"name\">Should (Not) Be Empty\x3c/span>\x3c/li>\n<li><span class=\"name\">Should (Not) Be Equal (As Strings/Integers/Numbers)\x3c/span>\x3c/li>\n<li><span class=\"name\">Should (Not) Match (Regexp)\x3c/span>\x3c/li>\n<li><span class=\"name\">Should (Not) Contain\x3c/span>\x3c/li>\n<li><span class=\"name\">Should (Not) Start With\x3c/span>\x3c/li>\n<li><span class=\"name\">Should (Not) End With\x3c/span>\x3c/li>\n<li><span class=\"name\">Convert To String\x3c/span>\x3c/li>\n<li><span class=\"name\">Convert To Bytes\x3c/span>\x3c/li>\n\x3c/ul>",
	"generated": "2019-08-14 18:10:33",
	"inits": [],
	"keywords": [{
		"args": ["string"],
		"doc": "<p>Converts string to lowercase.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${str1} =\x3c/td>\n<td>Convert To Lowercase\x3c/td>\n<td>ABC\x3c/td>\n\x3c/tr>\n<tr>\n<td>${str2} =\x3c/td>\n<td>Convert To Lowercase\x3c/td>\n<td>1A2c3D\x3c/td>\n\x3c/tr>\n<tr>\n<td>Should Be Equal\x3c/td>\n<td>${str1}\x3c/td>\n<td>abc\x3c/td>\n\x3c/tr>\n<tr>\n<td>Should Be Equal\x3c/td>\n<td>${str2}\x3c/td>\n<td>1a2c3d\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Convert To Lowercase",
		"shortdoc": "Converts string to lowercase.",
		"tags": []
	}, {
		"args": ["string"],
		"doc": "<p>Converts string to uppercase.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${str1} =\x3c/td>\n<td>Convert To Uppercase\x3c/td>\n<td>abc\x3c/td>\n\x3c/tr>\n<tr>\n<td>${str2} =\x3c/td>\n<td>Convert To Uppercase\x3c/td>\n<td>1a2C3d\x3c/td>\n\x3c/tr>\n<tr>\n<td>Should Be Equal\x3c/td>\n<td>${str1}\x3c/td>\n<td>ABC\x3c/td>\n\x3c/tr>\n<tr>\n<td>Should Be Equal\x3c/td>\n<td>${str2}\x3c/td>\n<td>1A2C3D\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Convert To Uppercase",
		"shortdoc": "Converts string to uppercase.",
		"tags": []
	}, {
		"args": ["bytes", "encoding", "errors=strict"],
		"doc": "<p>Decodes the given <code>bytes\x3c/code> to a Unicode string using the given <code>encoding\x3c/code>.\x3c/p>\n<p><code>errors\x3c/code> argument controls what to do if decoding some bytes fails. All values accepted by <code>decode\x3c/code> method in Python are valid, but in practice the following values are most useful:\x3c/p>\n<ul>\n<li><code>strict\x3c/code>: fail if characters cannot be decoded (default)\x3c/li>\n<li><code>ignore\x3c/code>: ignore characters that cannot be decoded\x3c/li>\n<li><code>replace\x3c/code>: replace characters that cannot be decoded with a replacement character\x3c/li>\n\x3c/ul>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${string} =\x3c/td>\n<td>Decode Bytes To String\x3c/td>\n<td>${bytes}\x3c/td>\n<td>UTF-8\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${string} =\x3c/td>\n<td>Decode Bytes To String\x3c/td>\n<td>${bytes}\x3c/td>\n<td>ASCII\x3c/td>\n<td>errors=ignore\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>Use <a href=\"#Encode%20String%20To%20Bytes\" class=\"name\">Encode String To Bytes\x3c/a> if you need to convert Unicode strings to byte strings, and <span class=\"name\">Convert To String\x3c/span> in <code>BuiltIn\x3c/code> if you need to convert arbitrary objects to Unicode strings.\x3c/p>",
		"matched": True,
		"name": "Decode Bytes To String",
		"shortdoc": "Decodes the given ``bytes`` to a Unicode string using the given ``encoding``.",
		"tags": []
	}, {
		"args": ["string", "encoding", "errors=strict"],
		"doc": "<p>Encodes the given Unicode <code>string\x3c/code> to bytes using the given <code>encoding\x3c/code>.\x3c/p>\n<p><code>errors\x3c/code> argument controls what to do if encoding some characters fails. All values accepted by <code>encode\x3c/code> method in Python are valid, but in practice the following values are most useful:\x3c/p>\n<ul>\n<li><code>strict\x3c/code>: fail if characters cannot be encoded (default)\x3c/li>\n<li><code>ignore\x3c/code>: ignore characters that cannot be encoded\x3c/li>\n<li><code>replace\x3c/code>: replace characters that cannot be encoded with a replacement character\x3c/li>\n\x3c/ul>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${bytes} =\x3c/td>\n<td>Encode String To Bytes\x3c/td>\n<td>${string}\x3c/td>\n<td>UTF-8\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${bytes} =\x3c/td>\n<td>Encode String To Bytes\x3c/td>\n<td>${string}\x3c/td>\n<td>ASCII\x3c/td>\n<td>errors=ignore\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>Use <span class=\"name\">Convert To Bytes\x3c/span> in <code>BuiltIn\x3c/code> if you want to create bytes based on character or integer sequences. Use <a href=\"#Decode%20Bytes%20To%20String\" class=\"name\">Decode Bytes To String\x3c/a> if you need to convert byte strings to Unicode strings and <span class=\"name\">Convert To String\x3c/span> in <code>BuiltIn\x3c/code> if you need to convert arbitrary objects to Unicode.\x3c/p>",
		"matched": True,
		"name": "Encode String To Bytes",
		"shortdoc": "Encodes the given Unicode ``string`` to bytes using the given ``encoding``.",
		"tags": []
	}, {
		"args": ["string", "marker"],
		"doc": "<p>Returns contents of the <code>string\x3c/code> before the first occurrence of <code>marker\x3c/code>.\x3c/p>\n<p>If the <code>marker\x3c/code> is not found, whole string is returned.\x3c/p>\n<p>See also <a href=\"#Fetch%20From%20Right\" class=\"name\">Fetch From Right\x3c/a>, <a href=\"#Split%20String\" class=\"name\">Split String\x3c/a> and <a href=\"#Split%20String%20From%20Right\" class=\"name\">Split String From Right\x3c/a>.\x3c/p>",
		"matched": True,
		"name": "Fetch From Left",
		"shortdoc": "Returns contents of the ``string`` before the first occurrence of ``marker``.",
		"tags": []
	}, {
		"args": ["string", "marker"],
		"doc": "<p>Returns contents of the <code>string\x3c/code> after the last occurrence of <code>marker\x3c/code>.\x3c/p>\n<p>If the <code>marker\x3c/code> is not found, whole string is returned.\x3c/p>\n<p>See also <a href=\"#Fetch%20From%20Left\" class=\"name\">Fetch From Left\x3c/a>, <a href=\"#Split%20String\" class=\"name\">Split String\x3c/a> and <a href=\"#Split%20String%20From%20Right\" class=\"name\">Split String From Right\x3c/a>.\x3c/p>",
		"matched": True,
		"name": "Fetch From Right",
		"shortdoc": "Returns contents of the ``string`` after the last occurrence of ``marker``.",
		"tags": []
	}, {
		"args": ["template", "*positional", "**named"],
		"doc": "<p>Formats a <code>template\x3c/code> using the given <code>positional\x3c/code> and <code>named\x3c/code> arguments.\x3c/p>\n<p>The template can be either be a string or an absolute path to an existing file. In the latter case the file is read and its contents are used as the template. If the template file contains non-ASCII characters, it must be encoded using UTF-8.\x3c/p>\n<p>The template is formatted using Python's <a href=\"https://docs.python.org/library/string.html#format-string-syntax\">format string syntax\x3c/a>. Placeholders are marked using <code>{}\x3c/code> with possible field name and format specification inside. Literal curly braces can be inserted by doubling them like <span class=\"name\">{{\x3c/span> and <span class=\"name\">}}\x3c/span>.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${to} =\x3c/td>\n<td>Format String\x3c/td>\n<td>To: {} &lt;{}&gt;\x3c/td>\n<td>${user}\x3c/td>\n<td>${email}\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${to} =\x3c/td>\n<td>Format String\x3c/td>\n<td>To: {name} &lt;{email}&gt;\x3c/td>\n<td>name=${name}\x3c/td>\n<td>email=${email}\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${to} =\x3c/td>\n<td>Format String\x3c/td>\n<td>To: {user.name} &lt;{user.email}&gt;\x3c/td>\n<td>user=${user}\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${xx} =\x3c/td>\n<td>Format String\x3c/td>\n<td>{:*^30}\x3c/td>\n<td>centered\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${yy} =\x3c/td>\n<td>Format String\x3c/td>\n<td>{0:{width}{base}}\x3c/td>\n<td>${42}\x3c/td>\n<td>base=X\x3c/td>\n<td>width=10\x3c/td>\n\x3c/tr>\n<tr>\n<td>${zz} =\x3c/td>\n<td>Format String\x3c/td>\n<td>${CURDIR}/template.txt\x3c/td>\n<td>positional\x3c/td>\n<td>named=value\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>New in Robot Framework 3.1.\x3c/p>",
		"matched": True,
		"name": "Format String",
		"shortdoc": "Formats a ``template`` using the given ``positional`` and ``named`` arguments.",
		"tags": []
	}, {
		"args": ["length=8", "chars=[LETTERS][NUMBERS]"],
		"doc": "<p>Generates a string with a desired <code>length\x3c/code> from the given <code>chars\x3c/code>.\x3c/p>\n<p>The population sequence <code>chars\x3c/code> contains the characters to use when generating the random string. It can contain any characters, and it is possible to use special markers explained in the table below:\x3c/p>\n<table border=\"1\">\n<tr>\n<th>Marker\x3c/th>\n<th>Explanation\x3c/th>\n\x3c/tr>\n<tr>\n<td><code>[LOWER]\x3c/code>\x3c/td>\n<td>Lowercase ASCII characters from <code>a\x3c/code> to <code>z\x3c/code>.\x3c/td>\n\x3c/tr>\n<tr>\n<td><code>[UPPER]\x3c/code>\x3c/td>\n<td>Uppercase ASCII characters from <code>A\x3c/code> to <code>Z\x3c/code>.\x3c/td>\n\x3c/tr>\n<tr>\n<td><code>[LETTERS]\x3c/code>\x3c/td>\n<td>Lowercase and uppercase ASCII characters.\x3c/td>\n\x3c/tr>\n<tr>\n<td><code>[NUMBERS]\x3c/code>\x3c/td>\n<td>Numbers from 0 to 9.\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${ret} =\x3c/td>\n<td>Generate Random String\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${low} =\x3c/td>\n<td>Generate Random String\x3c/td>\n<td>12\x3c/td>\n<td>[LOWER]\x3c/td>\n\x3c/tr>\n<tr>\n<td>${bin} =\x3c/td>\n<td>Generate Random String\x3c/td>\n<td>8\x3c/td>\n<td>01\x3c/td>\n\x3c/tr>\n<tr>\n<td>${hex} =\x3c/td>\n<td>Generate Random String\x3c/td>\n<td>4\x3c/td>\n<td>[NUMBERS]abcdef\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Generate Random String",
		"shortdoc": "Generates a string with a desired ``length`` from the given ``chars``.",
		"tags": []
	}, {
		"args": ["string", "line_number"],
		"doc": "<p>Returns the specified line from the given <code>string\x3c/code>.\x3c/p>\n<p>Line numbering starts from 0 and it is possible to use negative indices to refer to lines from the end. The line is returned without the newline character.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${first} =\x3c/td>\n<td>Get Line\x3c/td>\n<td>${string}\x3c/td>\n<td>0\x3c/td>\n\x3c/tr>\n<tr>\n<td>${2nd last} =\x3c/td>\n<td>Get Line\x3c/td>\n<td>${string}\x3c/td>\n<td>-2\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>Use <a href=\"#Split%20To%20Lines\" class=\"name\">Split To Lines\x3c/a> if all lines are needed.\x3c/p>",
		"matched": True,
		"name": "Get Line",
		"shortdoc": "Returns the specified line from the given ``string``.",
		"tags": []
	}, {
		"args": ["string"],
		"doc": "<p>Returns and logs the number of lines in the given string.\x3c/p>",
		"matched": True,
		"name": "Get Line Count",
		"shortdoc": "Returns and logs the number of lines in the given string.",
		"tags": []
	}, {
		"args": ["string", "pattern", "case_insensitive=False"],
		"doc": "<p>Returns lines of the given <code>string\x3c/code> that contain the <code>pattern\x3c/code>.\x3c/p>\n<p>The <code>pattern\x3c/code> is always considered to be a normal string, not a glob or regexp pattern. A line matches if the <code>pattern\x3c/code> is found anywhere on it.\x3c/p>\n<p>The match is case-sensitive by default, but giving <code>case_insensitive\x3c/code> a True value makes it case-insensitive. The value is considered True if it is a non-empty string that is not equal to <code>false\x3c/code>, <code>none\x3c/code> or <code>no\x3c/code>. If the value is not a string, its truth value is got directly in Python. Considering <code>none\x3c/code> false is new in RF 3.0.3.\x3c/p>\n<p>Lines are returned as one string catenated back together with newlines. Possible trailing newline is never returned. The number of matching lines is automatically logged.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${lines} =\x3c/td>\n<td>Get Lines Containing String\x3c/td>\n<td>${result}\x3c/td>\n<td>An example\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${ret} =\x3c/td>\n<td>Get Lines Containing String\x3c/td>\n<td>${ret}\x3c/td>\n<td>FAIL\x3c/td>\n<td>case-insensitive\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>See <a href=\"#Get%20Lines%20Matching%20Pattern\" class=\"name\">Get Lines Matching Pattern\x3c/a> and <a href=\"#Get%20Lines%20Matching%20Regexp\" class=\"name\">Get Lines Matching Regexp\x3c/a> if you need more complex pattern matching.\x3c/p>",
		"matched": True,
		"name": "Get Lines Containing String",
		"shortdoc": "Returns lines of the given ``string`` that contain the ``pattern``.",
		"tags": []
	}, {
		"args": ["string", "pattern", "case_insensitive=False"],
		"doc": "<p>Returns lines of the given <code>string\x3c/code> that match the <code>pattern\x3c/code>.\x3c/p>\n<p>The <code>pattern\x3c/code> is a <i>glob pattern\x3c/i> where:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><code>*\x3c/code>\x3c/td>\n<td>matches everything\x3c/td>\n\x3c/tr>\n<tr>\n<td><code>?\x3c/code>\x3c/td>\n<td>matches any single character\x3c/td>\n\x3c/tr>\n<tr>\n<td><code>[chars]\x3c/code>\x3c/td>\n<td>matches any character inside square brackets (e.g. <code>[abc]\x3c/code> matches either <code>a\x3c/code>, <code>b\x3c/code> or <code>c\x3c/code>)\x3c/td>\n\x3c/tr>\n<tr>\n<td><code>[!chars]\x3c/code>\x3c/td>\n<td>matches any character not inside square brackets\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>A line matches only if it matches the <code>pattern\x3c/code> fully.\x3c/p>\n<p>The match is case-sensitive by default, but giving <code>case_insensitive\x3c/code> a True value makes it case-insensitive. The value is considered True if it is a non-empty string that is not equal to <code>false\x3c/code>, <code>none\x3c/code> or <code>no\x3c/code>. If the value is not a string, its truth value is got directly in Python. Considering <code>none\x3c/code> false is new in RF 3.0.3.\x3c/p>\n<p>Lines are returned as one string catenated back together with newlines. Possible trailing newline is never returned. The number of matching lines is automatically logged.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${lines} =\x3c/td>\n<td>Get Lines Matching Pattern\x3c/td>\n<td>${result}\x3c/td>\n<td>Wild???? example\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${ret} =\x3c/td>\n<td>Get Lines Matching Pattern\x3c/td>\n<td>${ret}\x3c/td>\n<td>FAIL: *\x3c/td>\n<td>case_insensitive=True\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>See <a href=\"#Get%20Lines%20Matching%20Regexp\" class=\"name\">Get Lines Matching Regexp\x3c/a> if you need more complex patterns and <a href=\"#Get%20Lines%20Containing%20String\" class=\"name\">Get Lines Containing String\x3c/a> if searching literal strings is enough.\x3c/p>",
		"matched": True,
		"name": "Get Lines Matching Pattern",
		"shortdoc": "Returns lines of the given ``string`` that match the ``pattern``.",
		"tags": []
	}, {
		"args": ["string", "pattern", "partial_match=False"],
		"doc": "<p>Returns lines of the given <code>string\x3c/code> that match the regexp <code>pattern\x3c/code>.\x3c/p>\n<p>See <span class=\"name\">BuiltIn.Should Match Regexp\x3c/span> for more information about Python regular expression syntax in general and how to use it in Robot Framework test data in particular.\x3c/p>\n<p>By default lines match only if they match the pattern fully, but partial matching can be enabled by giving the <code>partial_match\x3c/code> argument a True value. The value is considered True if it is a non-empty string that is not equal to <code>false\x3c/code>, <code>none\x3c/code> or <code>no\x3c/code>. If the value is not a string, its truth value is got directly in Python. Considering <code>none\x3c/code> false is new in RF 3.0.3.\x3c/p>\n<p>If the pattern is empty, it matches only empty lines by default. When partial matching is enabled, empty pattern matches all lines.\x3c/p>\n<p>Notice that to make the match case-insensitive, you need to prefix the pattern with case-insensitive flag <code>(?i)\x3c/code>.\x3c/p>\n<p>Lines are returned as one string concatenated back together with newlines. Possible trailing newline is never returned. The number of matching lines is automatically logged.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${lines} =\x3c/td>\n<td>Get Lines Matching Regexp\x3c/td>\n<td>${result}\x3c/td>\n<td>Reg\\\\w{3} example\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${lines} =\x3c/td>\n<td>Get Lines Matching Regexp\x3c/td>\n<td>${result}\x3c/td>\n<td>Reg\\\\w{3} example\x3c/td>\n<td>partial_match=True\x3c/td>\n\x3c/tr>\n<tr>\n<td>${ret} =\x3c/td>\n<td>Get Lines Matching Regexp\x3c/td>\n<td>${ret}\x3c/td>\n<td>(?i)FAIL: .*\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>See <a href=\"#Get%20Lines%20Matching%20Pattern\" class=\"name\">Get Lines Matching Pattern\x3c/a> and <a href=\"#Get%20Lines%20Containing%20String\" class=\"name\">Get Lines Containing String\x3c/a> if you do not need full regular expression powers (and complexity).\x3c/p>\n<p><code>partial_match\x3c/code> argument is new in Robot Framework 2.9. In earlier versions exact match was always required.\x3c/p>",
		"matched": True,
		"name": "Get Lines Matching Regexp",
		"shortdoc": "Returns lines of the given ``string`` that match the regexp ``pattern``.",
		"tags": []
	}, {
		"args": ["string", "pattern", "*groups"],
		"doc": "<p>Returns a list of all non-overlapping matches in the given string.\x3c/p>\n<p><code>string\x3c/code> is the string to find matches from and <code>pattern\x3c/code> is the regular expression. See <span class=\"name\">BuiltIn.Should Match Regexp\x3c/span> for more information about Python regular expression syntax in general and how to use it in Robot Framework test data in particular.\x3c/p>\n<p>If no groups are used, the returned list contains full matches. If one group is used, the list contains only contents of that group. If multiple groups are used, the list contains tuples that contain individual group contents. All groups can be given as indexes (starting from 1) and named groups also as names.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${no match} =\x3c/td>\n<td>Get Regexp Matches\x3c/td>\n<td>the string\x3c/td>\n<td>xxx\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${matches} =\x3c/td>\n<td>Get Regexp Matches\x3c/td>\n<td>the string\x3c/td>\n<td>t..\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${one group} =\x3c/td>\n<td>Get Regexp Matches\x3c/td>\n<td>the string\x3c/td>\n<td>t(..)\x3c/td>\n<td>1\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${named group} =\x3c/td>\n<td>Get Regexp Matches\x3c/td>\n<td>the string\x3c/td>\n<td>t(?P&lt;name&gt;..)\x3c/td>\n<td>name\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${two groups} =\x3c/td>\n<td>Get Regexp Matches\x3c/td>\n<td>the string\x3c/td>\n<td>t(.)(.)\x3c/td>\n<td>1\x3c/td>\n<td>2\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>=&gt;\x3c/p>\n<pre>\n${no match} = []\n${matches} = ['the', 'tri']\n${one group} = ['he', 'ri']\n${named group} = ['he', 'ri']\n${two groups} = [('h', 'e'), ('r', 'i')]\n\x3c/pre>\n<p>New in Robot Framework 2.9.\x3c/p>",
		"matched": True,
		"name": "Get Regexp Matches",
		"shortdoc": "Returns a list of all non-overlapping matches in the given string.",
		"tags": []
	}, {
		"args": ["string", "start", "end=None"],
		"doc": "<p>Returns a substring from <code>start\x3c/code> index to <code>end\x3c/code> index.\x3c/p>\n<p>The <code>start\x3c/code> index is inclusive and <code>end\x3c/code> is exclusive. Indexing starts from 0, and it is possible to use negative indices to refer to characters from the end.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${ignore first} =\x3c/td>\n<td>Get Substring\x3c/td>\n<td>${string}\x3c/td>\n<td>1\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${ignore last} =\x3c/td>\n<td>Get Substring\x3c/td>\n<td>${string}\x3c/td>\n<td>\x3c/td>\n<td>-1\x3c/td>\n\x3c/tr>\n<tr>\n<td>${5th to 10th} =\x3c/td>\n<td>Get Substring\x3c/td>\n<td>${string}\x3c/td>\n<td>4\x3c/td>\n<td>10\x3c/td>\n\x3c/tr>\n<tr>\n<td>${first two} =\x3c/td>\n<td>Get Substring\x3c/td>\n<td>${string}\x3c/td>\n<td>\x3c/td>\n<td>1\x3c/td>\n\x3c/tr>\n<tr>\n<td>${last two} =\x3c/td>\n<td>Get Substring\x3c/td>\n<td>${string}\x3c/td>\n<td>-2\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Get Substring",
		"shortdoc": "Returns a substring from ``start`` index to ``end`` index.",
		"tags": []
	}, {
		"args": ["string", "*removables"],
		"doc": "<p>Removes all <code>removables\x3c/code> from the given <code>string\x3c/code>.\x3c/p>\n<p><code>removables\x3c/code> are used as literal strings. Each removable will be matched to a temporary string from which preceding removables have been already removed. See second example below.\x3c/p>\n<p>Use <a href=\"#Remove%20String%20Using%20Regexp\" class=\"name\">Remove String Using Regexp\x3c/a> if more powerful pattern matching is needed. If only a certain number of matches should be removed, <a href=\"#Replace%20String\" class=\"name\">Replace String\x3c/a> or <a href=\"#Replace%20String%20Using%20Regexp\" class=\"name\">Replace String Using Regexp\x3c/a> can be used.\x3c/p>\n<p>A modified version of the string is returned and the original string is not altered.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${str} =\x3c/td>\n<td>Remove String\x3c/td>\n<td>Robot Framework\x3c/td>\n<td>work\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>Should Be Equal\x3c/td>\n<td>${str}\x3c/td>\n<td>Robot Frame\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${str} =\x3c/td>\n<td>Remove String\x3c/td>\n<td>Robot Framework\x3c/td>\n<td>o\x3c/td>\n<td>bt\x3c/td>\n\x3c/tr>\n<tr>\n<td>Should Be Equal\x3c/td>\n<td>${str}\x3c/td>\n<td>R Framewrk\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Remove String",
		"shortdoc": "Removes all ``removables`` from the given ``string``.",
		"tags": []
	}, {
		"args": ["string", "*patterns"],
		"doc": "<p>Removes <code>patterns\x3c/code> from the given <code>string\x3c/code>.\x3c/p>\n<p>This keyword is otherwise identical to <a href=\"#Remove%20String\" class=\"name\">Remove String\x3c/a>, but the <code>patterns\x3c/code> to search for are considered to be a regular expression. See <a href=\"#Replace%20String%20Using%20Regexp\" class=\"name\">Replace String Using Regexp\x3c/a> for more information about the regular expression syntax. That keyword can also be used if there is a need to remove only a certain number of occurrences.\x3c/p>",
		"matched": True,
		"name": "Remove String Using Regexp",
		"shortdoc": "Removes ``patterns`` from the given ``string``.",
		"tags": []
	}, {
		"args": ["string", "search_for", "replace_with", "count=-1"],
		"doc": "<p>Replaces <code>search_for\x3c/code> in the given <code>string\x3c/code> with <code>replace_with\x3c/code>.\x3c/p>\n<p><code>search_for\x3c/code> is used as a literal string. See <a href=\"#Replace%20String%20Using%20Regexp\" class=\"name\">Replace String Using Regexp\x3c/a> if more powerful pattern matching is needed. If you need to just remove a string see <a href=\"#Remove%20String\" class=\"name\">Remove String\x3c/a>.\x3c/p>\n<p>If the optional argument <code>count\x3c/code> is given, only that many occurrences from left are replaced. Negative <code>count\x3c/code> means that all occurrences are replaced (default behaviour) and zero means that nothing is done.\x3c/p>\n<p>A modified version of the string is returned and the original string is not altered.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${str} =\x3c/td>\n<td>Replace String\x3c/td>\n<td>Hello, world!\x3c/td>\n<td>world\x3c/td>\n<td>tellus\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>Should Be Equal\x3c/td>\n<td>${str}\x3c/td>\n<td>Hello, tellus!\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${str} =\x3c/td>\n<td>Replace String\x3c/td>\n<td>Hello, world!\x3c/td>\n<td>l\x3c/td>\n<td>${EMPTY}\x3c/td>\n<td>count=1\x3c/td>\n\x3c/tr>\n<tr>\n<td>Should Be Equal\x3c/td>\n<td>${str}\x3c/td>\n<td>Helo, world!\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Replace String",
		"shortdoc": "Replaces ``search_for`` in the given ``string`` with ``replace_with``.",
		"tags": []
	}, {
		"args": ["string", "pattern", "replace_with", "count=-1"],
		"doc": "<p>Replaces <code>pattern\x3c/code> in the given <code>string\x3c/code> with <code>replace_with\x3c/code>.\x3c/p>\n<p>This keyword is otherwise identical to <a href=\"#Replace%20String\" class=\"name\">Replace String\x3c/a>, but the <code>pattern\x3c/code> to search for is considered to be a regular expression.  See <span class=\"name\">BuiltIn.Should Match Regexp\x3c/span> for more information about Python regular expression syntax in general and how to use it in Robot Framework test data in particular.\x3c/p>\n<p>If you need to just remove a string see <a href=\"#Remove%20String%20Using%20Regexp\" class=\"name\">Remove String Using Regexp\x3c/a>.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${str} =\x3c/td>\n<td>Replace String Using Regexp\x3c/td>\n<td>${str}\x3c/td>\n<td>20\\\\d\\\\d-\\\\d\\\\d-\\\\d\\\\d\x3c/td>\n<td>&lt;DATE&gt;\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${str} =\x3c/td>\n<td>Replace String Using Regexp\x3c/td>\n<td>${str}\x3c/td>\n<td>(Hello|Hi)\x3c/td>\n<td>${EMPTY}\x3c/td>\n<td>count=1\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Replace String Using Regexp",
		"shortdoc": "Replaces ``pattern`` in the given ``string`` with ``replace_with``.",
		"tags": []
	}, {
		"args": ["item", "msg=None"],
		"doc": "<p>Fails if the given <code>item\x3c/code> is not a byte string.\x3c/p>\n<p>Use <a href=\"#Should%20Be%20Unicode%20String\" class=\"name\">Should Be Unicode String\x3c/a> if you want to verify the <code>item\x3c/code> is a Unicode string, or <a href=\"#Should%20Be%20String\" class=\"name\">Should Be String\x3c/a> if both Unicode and byte strings are fine. See <a href=\"#Should%20Be%20String\" class=\"name\">Should Be String\x3c/a> for more details about Unicode strings and byte strings.\x3c/p>\n<p>The default error message can be overridden with the optional <code>msg\x3c/code> argument.\x3c/p>",
		"matched": True,
		"name": "Should Be Byte String",
		"shortdoc": "Fails if the given ``item`` is not a byte string.",
		"tags": []
	}, {
		"args": ["string", "msg=None"],
		"doc": "<p>Fails if the given <code>string\x3c/code> is not in lowercase.\x3c/p>\n<p>For example, <code>'string'\x3c/code> and <code>'with specials!'\x3c/code> would pass, and <code>'String'\x3c/code>, <code>''\x3c/code> and <code>' '\x3c/code> would fail.\x3c/p>\n<p>The default error message can be overridden with the optional <code>msg\x3c/code> argument.\x3c/p>\n<p>See also <a href=\"#Should%20Be%20Uppercase\" class=\"name\">Should Be Uppercase\x3c/a> and <a href=\"#Should%20Be%20Titlecase\" class=\"name\">Should Be Titlecase\x3c/a>.\x3c/p>",
		"matched": True,
		"name": "Should Be Lowercase",
		"shortdoc": "Fails if the given ``string`` is not in lowercase.",
		"tags": []
	}, {
		"args": ["item", "msg=None"],
		"doc": "<p>Fails if the given <code>item\x3c/code> is not a string.\x3c/p>\n<p>With Python 2, except with IronPython, this keyword passes regardless is the <code>item\x3c/code> a Unicode string or a byte string. Use <a href=\"#Should%20Be%20Unicode%20String\" class=\"name\">Should Be Unicode String\x3c/a> or <a href=\"#Should%20Be%20Byte%20String\" class=\"name\">Should Be Byte String\x3c/a> if you want to restrict the string type. Notice that with Python 2, except with IronPython, <code>'string'\x3c/code> creates a byte string and <code>u'unicode'\x3c/code> must be used to create a Unicode string.\x3c/p>\n<p>With Python 3 and IronPython, this keyword passes if the string is a Unicode string but fails if it is bytes. Notice that with both Python 3 and IronPython, <code>'string'\x3c/code> creates a Unicode string, and <code>b'bytes'\x3c/code> must be used to create a byte string.\x3c/p>\n<p>The default error message can be overridden with the optional <code>msg\x3c/code> argument.\x3c/p>",
		"matched": True,
		"name": "Should Be String",
		"shortdoc": "Fails if the given ``item`` is not a string.",
		"tags": []
	}, {
		"args": ["string", "msg=None"],
		"doc": "<p>Fails if given <code>string\x3c/code> is not title.\x3c/p>\n<p><code>string\x3c/code> is a titlecased string if there is at least one character in it, uppercase characters only follow uncased characters and lowercase characters only cased ones.\x3c/p>\n<p>For example, <code>'This Is Title'\x3c/code> would pass, and <code>'Word In UPPER'\x3c/code>, <code>'Word In lower'\x3c/code>, <code>''\x3c/code> and <code>' '\x3c/code> would fail.\x3c/p>\n<p>The default error message can be overridden with the optional <code>msg\x3c/code> argument.\x3c/p>\n<p>See also <a href=\"#Should%20Be%20Uppercase\" class=\"name\">Should Be Uppercase\x3c/a> and <a href=\"#Should%20Be%20Lowercase\" class=\"name\">Should Be Lowercase\x3c/a>.\x3c/p>",
		"matched": True,
		"name": "Should Be Titlecase",
		"shortdoc": "Fails if given ``string`` is not title.",
		"tags": []
	}, {
		"args": ["item", "msg=None"],
		"doc": "<p>Fails if the given <code>item\x3c/code> is not a Unicode string.\x3c/p>\n<p>Use <a href=\"#Should%20Be%20Byte%20String\" class=\"name\">Should Be Byte String\x3c/a> if you want to verify the <code>item\x3c/code> is a byte string, or <a href=\"#Should%20Be%20String\" class=\"name\">Should Be String\x3c/a> if both Unicode and byte strings are fine. See <a href=\"#Should%20Be%20String\" class=\"name\">Should Be String\x3c/a> for more details about Unicode strings and byte strings.\x3c/p>\n<p>The default error message can be overridden with the optional <code>msg\x3c/code> argument.\x3c/p>",
		"matched": True,
		"name": "Should Be Unicode String",
		"shortdoc": "Fails if the given ``item`` is not a Unicode string.",
		"tags": []
	}, {
		"args": ["string", "msg=None"],
		"doc": "<p>Fails if the given <code>string\x3c/code> is not in uppercase.\x3c/p>\n<p>For example, <code>'STRING'\x3c/code> and <code>'WITH SPECIALS!'\x3c/code> would pass, and <code>'String'\x3c/code>, <code>''\x3c/code> and <code>' '\x3c/code> would fail.\x3c/p>\n<p>The default error message can be overridden with the optional <code>msg\x3c/code> argument.\x3c/p>\n<p>See also <a href=\"#Should%20Be%20Titlecase\" class=\"name\">Should Be Titlecase\x3c/a> and <a href=\"#Should%20Be%20Lowercase\" class=\"name\">Should Be Lowercase\x3c/a>.\x3c/p>",
		"matched": True,
		"name": "Should Be Uppercase",
		"shortdoc": "Fails if the given ``string`` is not in uppercase.",
		"tags": []
	}, {
		"args": ["item", "msg=None"],
		"doc": "<p>Fails if the given <code>item\x3c/code> is a string.\x3c/p>\n<p>See <a href=\"#Should%20Be%20String\" class=\"name\">Should Be String\x3c/a> for more details about Unicode strings and byte strings.\x3c/p>\n<p>The default error message can be overridden with the optional <code>msg\x3c/code> argument.\x3c/p>",
		"matched": True,
		"name": "Should Not Be String",
		"shortdoc": "Fails if the given ``item`` is a string.",
		"tags": []
	}, {
		"args": ["string", "separator=None", "max_split=-1"],
		"doc": "<p>Splits the <code>string\x3c/code> using <code>separator\x3c/code> as a delimiter string.\x3c/p>\n<p>If a <code>separator\x3c/code> is not given, any whitespace string is a separator. In that case also possible consecutive whitespace as well as leading and trailing whitespace is ignored.\x3c/p>\n<p>Split words are returned as a list. If the optional <code>max_split\x3c/code> is given, at most <code>max_split\x3c/code> splits are done, and the returned list will have maximum <code>max_split + 1\x3c/code> elements.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>@{words} =\x3c/td>\n<td>Split String\x3c/td>\n<td>${string}\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>@{words} =\x3c/td>\n<td>Split String\x3c/td>\n<td>${string}\x3c/td>\n<td>,${SPACE}\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${pre}\x3c/td>\n<td>${post} =\x3c/td>\n<td>Split String\x3c/td>\n<td>${string}\x3c/td>\n<td>::\x3c/td>\n<td>1\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>See <a href=\"#Split%20String%20From%20Right\" class=\"name\">Split String From Right\x3c/a> if you want to start splitting from right, and <a href=\"#Fetch%20From%20Left\" class=\"name\">Fetch From Left\x3c/a> and <a href=\"#Fetch%20From%20Right\" class=\"name\">Fetch From Right\x3c/a> if you only want to get first/last part of the string.\x3c/p>",
		"matched": True,
		"name": "Split String",
		"shortdoc": "Splits the ``string`` using ``separator`` as a delimiter string.",
		"tags": []
	}, {
		"args": ["string", "separator=None", "max_split=-1"],
		"doc": "<p>Splits the <code>string\x3c/code> using <code>separator\x3c/code> starting from right.\x3c/p>\n<p>Same as <a href=\"#Split%20String\" class=\"name\">Split String\x3c/a>, but splitting is started from right. This has an effect only when <code>max_split\x3c/code> is given.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${first}\x3c/td>\n<td>${rest} =\x3c/td>\n<td>Split String\x3c/td>\n<td>${string}\x3c/td>\n<td>-\x3c/td>\n<td>1\x3c/td>\n\x3c/tr>\n<tr>\n<td>${rest}\x3c/td>\n<td>${last} =\x3c/td>\n<td>Split String From Right\x3c/td>\n<td>${string}\x3c/td>\n<td>-\x3c/td>\n<td>1\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Split String From Right",
		"shortdoc": "Splits the ``string`` using ``separator`` starting from right.",
		"tags": []
	}, {
		"args": ["string"],
		"doc": "<p>Splits the given <code>string\x3c/code> to characters.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>@{characters} =\x3c/td>\n<td>Split String To Characters\x3c/td>\n<td>${string}\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Split String To Characters",
		"shortdoc": "Splits the given ``string`` to characters.",
		"tags": []
	}, {
		"args": ["string", "start=0", "end=None"],
		"doc": "<p>Splits the given string to lines.\x3c/p>\n<p>It is possible to get only a selection of lines from <code>start\x3c/code> to <code>end\x3c/code> so that <code>start\x3c/code> index is inclusive and <code>end\x3c/code> is exclusive. Line numbering starts from 0, and it is possible to use negative indices to refer to lines from the end.\x3c/p>\n<p>Lines are returned without the newlines. The number of returned lines is automatically logged.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>@{lines} =\x3c/td>\n<td>Split To Lines\x3c/td>\n<td>${manylines}\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>@{ignore first} =\x3c/td>\n<td>Split To Lines\x3c/td>\n<td>${manylines}\x3c/td>\n<td>1\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>@{ignore last} =\x3c/td>\n<td>Split To Lines\x3c/td>\n<td>${manylines}\x3c/td>\n<td>\x3c/td>\n<td>-1\x3c/td>\n\x3c/tr>\n<tr>\n<td>@{5th to 10th} =\x3c/td>\n<td>Split To Lines\x3c/td>\n<td>${manylines}\x3c/td>\n<td>4\x3c/td>\n<td>10\x3c/td>\n\x3c/tr>\n<tr>\n<td>@{first two} =\x3c/td>\n<td>Split To Lines\x3c/td>\n<td>${manylines}\x3c/td>\n<td>\x3c/td>\n<td>1\x3c/td>\n\x3c/tr>\n<tr>\n<td>@{last two} =\x3c/td>\n<td>Split To Lines\x3c/td>\n<td>${manylines}\x3c/td>\n<td>-2\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>Use <a href=\"#Get%20Line\" class=\"name\">Get Line\x3c/a> if you only need to get a single line.\x3c/p>",
		"matched": True,
		"name": "Split To Lines",
		"shortdoc": "Splits the given string to lines.",
		"tags": []
	}, {
		"args": ["string", "mode=both", "characters=None"],
		"doc": "<p>Remove leading and/or trailing whitespaces from the given string.\x3c/p>\n<p><code>mode\x3c/code> is either <code>left\x3c/code> to remove leading characters, <code>right\x3c/code> to remove trailing characters, <code>both\x3c/code> (default) to remove the characters from both sides of the string or <code>none\x3c/code> to return the unmodified string.\x3c/p>\n<p>If the optional <code>characters\x3c/code> is given, it must be a string and the characters in the string will be stripped in the string. Please note, that this is not a substring to be removed but a list of characters, see the example below.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${stripped}=\x3c/td>\n<td>Strip String\x3c/td>\n<td>${SPACE}Hello${SPACE}\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>Should Be Equal\x3c/td>\n<td>${stripped}\x3c/td>\n<td>Hello\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${stripped}=\x3c/td>\n<td>Strip String\x3c/td>\n<td>${SPACE}Hello${SPACE}\x3c/td>\n<td>mode=left\x3c/td>\n\x3c/tr>\n<tr>\n<td>Should Be Equal\x3c/td>\n<td>${stripped}\x3c/td>\n<td>Hello${SPACE}\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${stripped}=\x3c/td>\n<td>Strip String\x3c/td>\n<td>aabaHelloeee\x3c/td>\n<td>characters=abe\x3c/td>\n\x3c/tr>\n<tr>\n<td>Should Be Equal\x3c/td>\n<td>${stripped}\x3c/td>\n<td>Hello\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>New in Robot Framework 3.0.\x3c/p>",
		"matched": True,
		"name": "Strip String",
		"shortdoc": "Remove leading and/or trailing whitespaces from the given string.",
		"tags": []
	}],
	"name": "String",
	"named_args": True,
	"scope": "global",
	"version": "3.1.2"
};
