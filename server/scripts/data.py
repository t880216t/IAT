libdoc = {
	"all_tags": [],
	"contains_tags": False,
	"doc": "<p>SeleniumLibrary is a web testing library for Robot Framework.\x3c/p>\n<p>This document explains how to use keywords provided by SeleniumLibrary. For information about installation, support, and more, please visit the <a href=\"https://github.com/robotframework/SeleniumLibrary\">project pages\x3c/a>. For more information about Robot Framework, see <a href=\"http://robotframework.org\">http://robotframework.org\x3c/a>.\x3c/p>\n<p>SeleniumLibrary uses the Selenium WebDriver modules internally to control a web browser. See <a href=\"http://seleniumhq.org\">http://seleniumhq.org\x3c/a> for more information about Selenium in general.\x3c/p>\n<h3 id=\"Table of contents\">Table of contents\x3c/h3>\n<ul>\n<li><a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a>\x3c/li>\n<li><a href=\"#Timeouts%2C%20waits%20and%20delays\" class=\"name\">Timeouts, waits and delays\x3c/a>\x3c/li>\n<li><a href=\"#Run-on-failure%20functionality\" class=\"name\">Run-on-failure functionality\x3c/a>\x3c/li>\n<li><a href=\"#Boolean%20arguments\" class=\"name\">Boolean arguments\x3c/a>\x3c/li>\n<li><a href=\"#Thread%20support\" class=\"name\">Thread support\x3c/a>\x3c/li>\n<li><a href=\"#Importing\" class=\"name\">Importing\x3c/a>\x3c/li>\n<li><a href=\"#Shortcuts\" class=\"name\">Shortcuts\x3c/a>\x3c/li>\n<li><a href=\"#Keywords\" class=\"name\">Keywords\x3c/a>\x3c/li>\n\x3c/ul>\n<h2 id=\"Locating elements\">Locating elements\x3c/h2>\n<p>All keywords in SeleniumLibrary that need to interact with an element on a web page take an argument typically named <code>locator\x3c/code> that specifies how to find the element. Most often the locator is given as a string using the locator syntax described below, but <a href=\"#Using%20WebElements\" class=\"name\">using WebElements\x3c/a> is possible too.\x3c/p>\n<h3 id=\"Locator syntax\">Locator syntax\x3c/h3>\n<p>SeleniumLibrary supports finding elements based on different strategies such as the element id, XPath expressions, or CSS selectors. The strategy can either be explicitly specified with a prefix or the strategy can be implicit.\x3c/p>\n<h4 id=\"Default locator strategy\">Default locator strategy\x3c/h4>\n<p>By default locators are considered to use the keyword specific default locator strategy. All keywords support finding elements based on <code>id\x3c/code> and <code>name\x3c/code> attributes, but some keywords support additional attributes or other values that make sense in their context. For example, <a href=\"#Click%20Link\" class=\"name\">Click Link\x3c/a> supports the <code>href\x3c/code> attribute and the link text and addition to the normal <code>id\x3c/code> and <code>name\x3c/code>.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a>\x3c/td>\n<td>example\x3c/td>\n<td># Match based on <code>id\x3c/code> or <code>name\x3c/code>.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Click%20Link\" class=\"name\">Click Link\x3c/a>\x3c/td>\n<td>example\x3c/td>\n<td># Match also based on link text and <code>href\x3c/code>.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Click%20Button\" class=\"name\">Click Button\x3c/a>\x3c/td>\n<td>example\x3c/td>\n<td># Match based on <code>id\x3c/code>, <code>name\x3c/code> or <code>value\x3c/code>.\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>If a locator accidentally starts with a prefix recognized as <a href=\"#Explicit%20locator%20strategy\" class=\"name\">explicit locator strategy\x3c/a> or <a href=\"#Implicit%20XPath%20strategy\" class=\"name\">implicit XPath strategy\x3c/a>, it is possible to use the explicit <code>default\x3c/code> prefix to enable the default strategy.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a>\x3c/td>\n<td>name:foo\x3c/td>\n<td># Find element with name <code>foo\x3c/code>.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a>\x3c/td>\n<td>default:name:foo\x3c/td>\n<td># Use default strategy with value <code>name:foo\x3c/code>.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a>\x3c/td>\n<td>//foo\x3c/td>\n<td># Find element using XPath <code>//foo\x3c/code>.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a>\x3c/td>\n<td>default: //foo\x3c/td>\n<td># Use default strategy with value <code>//foo\x3c/code>.\x3c/td>\n\x3c/tr>\n\x3c/table>\n<h4 id=\"Explicit locator strategy\">Explicit locator strategy\x3c/h4>\n<p>The explicit locator strategy is specified with a prefix using either syntax <code>strategy:value\x3c/code> or <code>strategy=value\x3c/code>. The former syntax is preferred, because the latter is identical to Robot Framework's <a href=\"http://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#named-argument-syntax\">named argument syntax\x3c/a> and that can cause problems. Spaces around the separator are ignored, so <code>id:foo\x3c/code>, <code>id: foo\x3c/code> and <code>id : foo\x3c/code> are all equivalent.\x3c/p>\n<p>Locator strategies that are supported by default are listed in the table below. In addition to them, it is possible to register <a href=\"#Custom%20locators\" class=\"name\">custom locators\x3c/a>.\x3c/p>\n<table border=\"1\">\n<tr>\n<th>Strategy\x3c/th>\n<th>Match based on\x3c/th>\n<th>Example\x3c/th>\n\x3c/tr>\n<tr>\n<td>id\x3c/td>\n<td>Element <code>id\x3c/code>.\x3c/td>\n<td><code>id:example\x3c/code>\x3c/td>\n\x3c/tr>\n<tr>\n<td>name\x3c/td>\n<td><code>name\x3c/code> attribute.\x3c/td>\n<td><code>name:example\x3c/code>\x3c/td>\n\x3c/tr>\n<tr>\n<td>identifier\x3c/td>\n<td>Either <code>id\x3c/code> or <code>name\x3c/code>.\x3c/td>\n<td><code>identifier:example\x3c/code>\x3c/td>\n\x3c/tr>\n<tr>\n<td>class\x3c/td>\n<td>Element <code>class\x3c/code>.\x3c/td>\n<td><code>class:example\x3c/code>\x3c/td>\n\x3c/tr>\n<tr>\n<td>tag\x3c/td>\n<td>Tag name.\x3c/td>\n<td><code>tag:div\x3c/code>\x3c/td>\n\x3c/tr>\n<tr>\n<td>xpath\x3c/td>\n<td>XPath expression.\x3c/td>\n<td><code>xpath://div[@id=\"example\"]\x3c/code>\x3c/td>\n\x3c/tr>\n<tr>\n<td>css\x3c/td>\n<td>CSS selector.\x3c/td>\n<td><code>css:div#example\x3c/code>\x3c/td>\n\x3c/tr>\n<tr>\n<td>dom\x3c/td>\n<td>DOM expression.\x3c/td>\n<td><code>dom:document.images[5]\x3c/code>\x3c/td>\n\x3c/tr>\n<tr>\n<td>link\x3c/td>\n<td>Exact text a link has.\x3c/td>\n<td><code>link:The example\x3c/code>\x3c/td>\n\x3c/tr>\n<tr>\n<td>partial link\x3c/td>\n<td>Partial link text.\x3c/td>\n<td><code>partial link:he ex\x3c/code>\x3c/td>\n\x3c/tr>\n<tr>\n<td>sizzle\x3c/td>\n<td>Sizzle selector provided by jQuery.\x3c/td>\n<td><code>sizzle:div.example\x3c/code>\x3c/td>\n\x3c/tr>\n<tr>\n<td>jquery\x3c/td>\n<td>Same as the above.\x3c/td>\n<td><code>jquery:div.example\x3c/code>\x3c/td>\n\x3c/tr>\n<tr>\n<td>default\x3c/td>\n<td>Keyword specific default behavior.\x3c/td>\n<td><code>default:example\x3c/code>\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>See the <a href=\"#Default%20locator%20strategy\" class=\"name\">Default locator strategy\x3c/a> section below for more information about how the default strategy works. Using the explicit <code>default\x3c/code> prefix is only necessary if the locator value itself accidentally matches some of the explicit strategies.\x3c/p>\n<p>Different locator strategies have different pros and cons. Using ids, either explicitly like <code>id:foo\x3c/code> or by using the <a href=\"#Default%20locator%20strategy\" class=\"name\">default locator strategy\x3c/a> simply like <code>foo\x3c/code>, is recommended when possible, because the syntax is simple and locating elements by an id is fast for browsers. If an element does not have an id or the id is not stable, other solutions need to be used. If an element has a unique tag name or class, using <code>tag\x3c/code>, <code>class\x3c/code> or <code>css\x3c/code> strategy like <code>tag:h1\x3c/code>, <code>class:example\x3c/code> or <code>css:h1.example\x3c/code> is often an easy solution. In more complex cases using XPath expressions is typically the best approach. They are very powerful but a downside is that they can also get complex.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a>\x3c/td>\n<td>id:foo\x3c/td>\n<td># Element with id 'foo'.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a>\x3c/td>\n<td>css:div#foo h1\x3c/td>\n<td># h1 element under div with id 'foo'.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a>\x3c/td>\n<td>xpath: //div[@id=\"foo\"]//h1\x3c/td>\n<td># Same as the above using XPath, not CSS.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a>\x3c/td>\n<td>xpath: //*[contains(text(), \"example\")]\x3c/td>\n<td># Element containing text 'example'.\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p><b>NOTE:\x3c/b>\x3c/p>\n<ul>\n<li>The <code>strategy:value\x3c/code> syntax is only supported by SeleniumLibrary 3.0 and newer.\x3c/li>\n<li>Using the <code>sizzle\x3c/code> strategy or its alias <code>jquery\x3c/code> requires that the system under test contains the jQuery library.\x3c/li>\n<li>Prior to SeleniumLibrary 3.0, table related keywords only supported <code>xpath\x3c/code>, <code>css\x3c/code> and <code>sizzle/jquery\x3c/code> strategies.\x3c/li>\n\x3c/ul>\n<h4 id=\"Implicit XPath strategy\">Implicit XPath strategy\x3c/h4>\n<p>If the locator starts with <code>//\x3c/code> or <code>(//\x3c/code>, the locator is considered to be an XPath expression. In other words, using <code>//div\x3c/code> is equivalent to using explicit <code>xpath://div\x3c/code>.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a>\x3c/td>\n<td>//div[@id=\"foo\"]//h1\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a>\x3c/td>\n<td>(//div)[2]\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>The support for the <code>(//\x3c/code> prefix is new in SeleniumLibrary 3.0.\x3c/p>\n<h3 id=\"Using WebElements\">Using WebElements\x3c/h3>\n<p>In addition to specifying a locator as a string, it is possible to use Selenium's WebElement objects. This requires first getting a WebElement, for example, by using the <a href=\"#Get%20WebElement\" class=\"name\">Get WebElement\x3c/a> keyword.\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${elem} =\x3c/td>\n<td><a href=\"#Get%20WebElement\" class=\"name\">Get WebElement\x3c/a>\x3c/td>\n<td>id:example\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a>\x3c/td>\n<td>${elem}\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>\n<h3 id=\"Custom locators\">Custom locators\x3c/h3>\n<p>If more complex lookups are required than what is provided through the default locators, custom lookup strategies can be created. Using custom locators is a two part process. First, create a keyword that returns a WebElement that should be acted on:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>Custom Locator Strategy\x3c/td>\n<td>[Arguments]\x3c/td>\n<td>${browser}\x3c/td>\n<td>${locator}\x3c/td>\n<td>${tag}\x3c/td>\n<td>${constraints}\x3c/td>\n\x3c/tr>\n<tr>\n<td>\x3c/td>\n<td>${element}=\x3c/td>\n<td>Execute Javascript\x3c/td>\n<td>return window.document.getElementById('${locator}');\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>\x3c/td>\n<td>[Return]\x3c/td>\n<td>${element}\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>This keyword is a reimplementation of the basic functionality of the <code>id\x3c/code> locator where <code>${browser}\x3c/code> is a reference to a WebDriver instance and <code>${locator}\x3c/code> is name of the locator strategy. To use this locator it must first be registered by using the <a href=\"#Add%20Location%20Strategy\" class=\"name\">Add Location Strategy\x3c/a> keyword:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Add%20Location%20Strategy\" class=\"name\">Add Location Strategy\x3c/a>\x3c/td>\n<td>custom\x3c/td>\n<td>Custom Locator Strategy\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>The first argument of <a href=\"#Add%20Location%20Strategy\" class=\"name\">Add Location Strategy\x3c/a> specifies the name of the strategy and it must be unique. After registering the strategy, the usage is the same as with other locators:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a>\x3c/td>\n<td>custom:example\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>See the <a href=\"#Add%20Location%20Strategy\" class=\"name\">Add Location Strategy\x3c/a> keyword for more details.\x3c/p>\n<h2 id=\"Timeouts, waits and delays\">Timeouts, waits and delays\x3c/h2>\n<p>This section discusses different ways how to wait for elements to appear on web pages and to slow down execution speed otherwise. It also explains the <a href=\"#Time%20format\" class=\"name\">time format\x3c/a> that can be used when setting various timeouts, waits and delays.\x3c/p>\n<h3 id=\"Timeout\">Timeout\x3c/h3>\n<p>SeleniumLibrary contains various keywords that have an optional <code>timeout\x3c/code> argument that specifies how long these keywords should wait for certain events or actions. These keywords include, for example, <code>Wait ...\x3c/code> keywords and keywords related to alerts. Additionally <a href=\"#Execute%20Async%20Javascript\" class=\"name\">Execute Async Javascript\x3c/a>. although it does not have <code>timeout\x3c/code>, argument, uses timeout to define how long asynchronous JavaScript can run.\x3c/p>\n<p>The default timeout these keywords use can be set globally either by using the <a href=\"#Set%20Selenium%20Timeout\" class=\"name\">Set Selenium Timeout\x3c/a> keyword or with the <code>timeout\x3c/code> argument when <a href=\"#Importing\" class=\"name\">importing\x3c/a> the library. See <a href=\"#Time%20format\" class=\"name\">time format\x3c/a> below for supported timeout syntax.\x3c/p>\n<h3 id=\"Implicit wait\">Implicit wait\x3c/h3>\n<p>Implicit wait specifies the maximum time how long Selenium waits when searching for elements. It can be set by using the <a href=\"#Set%20Selenium%20Implicit%20Wait\" class=\"name\">Set Selenium Implicit Wait\x3c/a> keyword or with the <code>implicit_wait\x3c/code> argument when <a href=\"#Importing\" class=\"name\">importing\x3c/a> the library. See <a href=\"http://seleniumhq.org/docs/04_webdriver_advanced.html\">Selenium documentation\x3c/a> for more information about this functionality.\x3c/p>\n<p>See <a href=\"#Time%20format\" class=\"name\">time format\x3c/a> below for supported syntax.\x3c/p>\n<h3 id=\"Selenium speed\">Selenium speed\x3c/h3>\n<p>Selenium execution speed can be slowed down globally by using <a href=\"#Set%20Selenium%20Speed\" class=\"name\">Set Selenium speed\x3c/a> keyword. This functionality is designed to be used for demonstrating or debugging purposes. Using it to make sure that elements appear on a page is not a good idea, and the above explained timeouts and waits should be used instead.\x3c/p>\n<p>See <a href=\"#Time%20format\" class=\"name\">time format\x3c/a> below for supported syntax.\x3c/p>\n<h3 id=\"Time format\">Time format\x3c/h3>\n<p>All timeouts and waits can be given as numbers considered seconds (e.g. <code>0.5\x3c/code> or <code>42\x3c/code>) or in Robot Framework's time syntax (e.g. <code>1.5 seconds\x3c/code> or <code>1 min 30 s\x3c/code>). For more information about the time syntax see the <a href=\"http://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html#time-format\">Robot Framework User Guide\x3c/a>.\x3c/p>\n<h2 id=\"Run-on-failure functionality\">Run-on-failure functionality\x3c/h2>\n<p>SeleniumLibrary has a handy feature that it can automatically execute a keyword if any of its own keywords fails. By default it uses the <a href=\"#Capture%20Page%20Screenshot\" class=\"name\">Capture Page Screenshot\x3c/a> keyword, but this can be changed either by using the <a href=\"#Register%20Keyword%20To%20Run%20On%20Failure\" class=\"name\">Register Keyword To Run On Failure\x3c/a> keyword or with the <code>run_on_failure\x3c/code> argument when <a href=\"#Importing\" class=\"name\">importing\x3c/a> the library. It is possible to use any keyword from any imported library or resource file.\x3c/p>\n<p>The run-on-failure functionality can be disabled by using a special value <code>NOTHING\x3c/code> or anything considered false (see <a href=\"#Boolean%20arguments\" class=\"name\">Boolean arguments\x3c/a>) such as <code>NONE\x3c/code>.\x3c/p>\n<h2 id=\"Boolean arguments\">Boolean arguments\x3c/h2>\n<p>Some keywords accept arguments that are handled as Boolean values True or false. If such an argument is given as a string, it is considered false if it is either empty or case-insensitively equal to <code>false\x3c/code>, <code>no\x3c/code> or <code>none\x3c/code>. Other strings are considered True regardless their value, and other argument types are tested using same <a href=\"https://docs.python.org/2/library/stdtypes.html#truth-value-testing\">rules as in Python\x3c/a>.\x3c/p>\n<p>True examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Set%20Screenshot%20Directory\" class=\"name\">Set Screenshot Directory\x3c/a>\x3c/td>\n<td>${RESULTS}\x3c/td>\n<td>persist=True\x3c/td>\n<td># Strings are generally True.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Set%20Screenshot%20Directory\" class=\"name\">Set Screenshot Directory\x3c/a>\x3c/td>\n<td>${RESULTS}\x3c/td>\n<td>persist=yes\x3c/td>\n<td># Same as the above.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Set%20Screenshot%20Directory\" class=\"name\">Set Screenshot Directory\x3c/a>\x3c/td>\n<td>${RESULTS}\x3c/td>\n<td>persist=${True}\x3c/td>\n<td># Python True is True.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Set%20Screenshot%20Directory\" class=\"name\">Set Screenshot Directory\x3c/a>\x3c/td>\n<td>${RESULTS}\x3c/td>\n<td>persist=${42}\x3c/td>\n<td># Numbers other than 0 are True.\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>False examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Set%20Screenshot%20Directory\" class=\"name\">Set Screenshot Directory\x3c/a>\x3c/td>\n<td>${RESULTS}\x3c/td>\n<td>persist=False\x3c/td>\n<td># String false is false.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Set%20Screenshot%20Directory\" class=\"name\">Set Screenshot Directory\x3c/a>\x3c/td>\n<td>${RESULTS}\x3c/td>\n<td>persist=no\x3c/td>\n<td># Also string no is false.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Set%20Screenshot%20Directory\" class=\"name\">Set Screenshot Directory\x3c/a>\x3c/td>\n<td>${RESULTS}\x3c/td>\n<td>persist=NONE\x3c/td>\n<td># String NONE is false.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Set%20Screenshot%20Directory\" class=\"name\">Set Screenshot Directory\x3c/a>\x3c/td>\n<td>${RESULTS}\x3c/td>\n<td>persist=${EMPTY}\x3c/td>\n<td># Empty string is false.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Set%20Screenshot%20Directory\" class=\"name\">Set Screenshot Directory\x3c/a>\x3c/td>\n<td>${RESULTS}\x3c/td>\n<td>persist=${FALSE}\x3c/td>\n<td># Python False is false.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Set%20Screenshot%20Directory\" class=\"name\">Set Screenshot Directory\x3c/a>\x3c/td>\n<td>${RESULTS}\x3c/td>\n<td>persist=${NONE}\x3c/td>\n<td># Python None is false.\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>Note that prior to SeleniumLibrary 3.0, all non-empty strings, including <code>false\x3c/code>, <code>no\x3c/code> and <code>none\x3c/code>, were considered True.\x3c/p>\n<h2 id=\"Thread support\">Thread support\x3c/h2>\n<p>SeleniumLibrary is not thread safe. This is mainly due because the underlying <a href=\"https://github.com/SeleniumHQ/selenium/wiki/Frequently-Asked-Questions#q-is-webdriver-thread-safe\">Selenium tool is not thread safe\x3c/a> within one browser/driver instance. Because of the limitation in the Selenium side, the keywords or the API provided the SeleniumLibrary is not thread safe.\x3c/p>",
	"generated": "2019-07-08 10:35:05",
	"inits": [{
		"args": ["timeout=5.0", "implicit_wait=0.0", "run_on_failure=Capture Page Screenshot", "screenshot_root_directory=None"],
		"doc": "<p>SeleniumLibrary can be imported with several optional arguments.\x3c/p>\n<ul>\n<li><code>timeout\x3c/code>: Default value for <span class=\"name\">timeouts\x3c/span> used with <code>Wait ...\x3c/code> keywords.\x3c/li>\n<li><code>implicit_wait\x3c/code>: Default value for <a href=\"#Implicit%20wait\" class=\"name\">implicit wait\x3c/a> used when locating elements.\x3c/li>\n<li><code>run_on_failure\x3c/code>: Default action for the <a href=\"#Run-on-failure%20functionality\" class=\"name\">run-on-failure functionality\x3c/a>.\x3c/li>\n<li><code>screenshot_root_directory\x3c/code>: Location where possible screenshots are created. If not given, the directory where the log file is written is used.\x3c/li>\n\x3c/ul>",
		"matched": True,
		"name": "Init",
		"shortdoc": "SeleniumLibrary can be imported with several optional arguments.",
		"tags": []
	}],
	"keywords": [{
		"args": ["name", "value", "path=None", "domain=None", "secure=None", "expiry=None"],
		"doc": "<p>Adds a cookie to your current session.\x3c/p>\n<p><code>name\x3c/code> and <code>value\x3c/code> are required, <code>path\x3c/code>, <code>domain\x3c/code>, <code>secure\x3c/code> and <code>expiry\x3c/code> are optional.  Expiry supports the same formats as the <a href=\"http://robotframework.org/robotframework/latest/libraries/DateTime.html\">DateTime\x3c/a> library or an epoch time stamp.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Add%20Cookie\" class=\"name\">Add Cookie\x3c/a>\x3c/td>\n<td>foo\x3c/td>\n<td>bar\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Add%20Cookie\" class=\"name\">Add Cookie\x3c/a>\x3c/td>\n<td>foo\x3c/td>\n<td>bar\x3c/td>\n<td>domain=example.com\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Add%20Cookie\" class=\"name\">Add Cookie\x3c/a>\x3c/td>\n<td>foo\x3c/td>\n<td>bar\x3c/td>\n<td>expiry=2027-09-28 16:21:35\x3c/td>\n<td># Expiry as timestamp.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Add%20Cookie\" class=\"name\">Add Cookie\x3c/a>\x3c/td>\n<td>foo\x3c/td>\n<td>bar\x3c/td>\n<td>expiry=1822137695\x3c/td>\n<td># Expiry as epoch seconds.\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>Prior to SeleniumLibrary 3.0 setting expiry did not work.\x3c/p>",
		"matched": True,
		"name": "Add Cookie",
		"shortdoc": "Adds a cookie to your current session.",
		"tags": []
	}, {
		"args": ["strategy_name", "strategy_keyword", "persist=False"],
		"doc": "<p>Adds a custom location strategy.\x3c/p>\n<p>See <a href=\"#Custom%20locators\" class=\"name\">Custom locators\x3c/a> for information how to create and use custom strategies. <a href=\"#Remove%20Location%20Strategy\" class=\"name\">Remove Location Strategy\x3c/a> can be used to remove a registered strategy.\x3c/p>\n<p>Location strategies are automatically removed after leaving the current scope by default. Setting <code>persist\x3c/code> to a True value (see <a href=\"#Boolean%20arguments\" class=\"name\">Boolean arguments\x3c/a>) will cause the location strategy to stay registered throughout the life of the test.\x3c/p>",
		"matched": True,
		"name": "Add Location Strategy",
		"shortdoc": "Adds a custom location strategy.",
		"tags": []
	}, {
		"args": ["text=", "action=ACCEPT", "timeout=None"],
		"doc": "<p>Verifies that an alert is present and, by default, accepts it.\x3c/p>\n<p>Fails if no alert is present. If <code>text\x3c/code> is a non-empty string, then it is used to verify alert's message. The alert is accepted by default, but that behavior can be controlled by using the <code>action\x3c/code> argument same way as with <a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a>.\x3c/p>\n<p><code>timeout\x3c/code> specifies how long to wait for the alert to appear. If it is not given, the global default <a href=\"#Timeout\" class=\"name\">timeout\x3c/a> is used instead.\x3c/p>\n<p><code>action\x3c/code> and <code>timeout\x3c/code> arguments are new in SeleniumLibrary 3.0. In earlier versions the alert was always accepted and timeout was hard coded to one second.\x3c/p>",
		"matched": True,
		"name": "Alert Should Be Present",
		"shortdoc": "Verifies that an alert is present and, by default, accepts it.",
		"tags": []
	}, {
		"args": ["action=ACCEPT", "timeout=0"],
		"doc": "<p>Verifies that no alert is present.\x3c/p>\n<p>If the alert actually exists, the <code>action\x3c/code> argument determines how it should be handled. By default the alert is accepted, but it can be also dismissed or left open the same way as with the <a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a> keyword.\x3c/p>\n<p><code>timeout\x3c/code> specifies how long to wait for the alert to appear. By default the alert is not waited at all, but a custom time can be given if alert may be delayed. See the <a href=\"#Time%20format\" class=\"name\">time format\x3c/a> section for information about the syntax.\x3c/p>\n<p>New in SeleniumLibrary 3.0.\x3c/p>",
		"matched": True,
		"name": "Alert Should Not Be Present",
		"shortdoc": "Verifies that no alert is present.",
		"tags": []
	}, {
		"args": ["locator", "id"],
		"doc": "<p>Assigns temporary <code>id\x3c/code> to element specified by <code>locator\x3c/code>.\x3c/p>\n<p>This is mainly useful if the locator is complicated and/or slow XPath expression and it is needed multiple times. Identifier expires when the page is reloaded.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Assign%20Id%20To%20Element\" class=\"name\">Assign ID to Element\x3c/a>\x3c/td>\n<td>//ul[@class='example' and ./li[contains(., 'Stuff')]]\x3c/td>\n<td>my id\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a>\x3c/td>\n<td>my id\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Assign Id To Element",
		"shortdoc": "Assigns temporary ``id`` to element specified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator", "filename=selenium-element-screenshot-{index}.png"],
		"doc": "<p>Captures screenshot from the element identified by <code>locator\x3c/code> and embeds it into log file.\x3c/p>\n<p>See <a href=\"#Capture%20Page%20Screenshot\" class=\"name\">Capture Page Screenshot\x3c/a> for details about <code>filename\x3c/code> argument. See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>An absolute path to the created element screenshot is returned.\x3c/p>\n<p>Support for capturing the screenshot from a element has limited support among browser vendors. Please check the browser vendor driver documentation does the browser support capturing a screenshot from a element.\x3c/p>\n<p>New in SeleniumLibrary 3.3\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Capture%20Element%20Screenshot\" class=\"name\">Capture Element Screenshot\x3c/a>\x3c/td>\n<td>id:image_id\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Capture%20Element%20Screenshot\" class=\"name\">Capture Element Screenshot\x3c/a>\x3c/td>\n<td>id:image_id\x3c/td>\n<td>${OUTPUTDIR}/id_image_id-1.png\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Capture Element Screenshot",
		"shortdoc": "Captures screenshot from the element identified by ``locator`` and embeds it into log file.",
		"tags": []
	}, {
		"args": ["filename=selenium-screenshot-{index}.png"],
		"doc": "<p>Takes screenshot of the current page and embeds it into log file.\x3c/p>\n<p><code>filename\x3c/code> argument specifies the name of the file to write the screenshot into. The directory where screenshots are saved can be set when <a href=\"#Importing\" class=\"name\">importing\x3c/a> the library or by using the <a href=\"#Set%20Screenshot%20Directory\" class=\"name\">Set Screenshot Directory\x3c/a> keyword. If the directory is not configured, screenshots are saved to the same directory where Robot Framework's log file is written.\x3c/p>\n<p>Starting from SeleniumLibrary 1.8, if <code>filename\x3c/code> contains marker <code>{index}\x3c/code>, it will be automatically replaced with unique running index preventing files to be overwritten. Indices start from 1, and how they are represented can be customized using Python's <a href=\"https://docs.python.org/2/library/string.html#formatstrings\">format string syntax\x3c/a>.\x3c/p>\n<p>An absolute path to the created screenshot file is returned.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Capture%20Page%20Screenshot\" class=\"name\">Capture Page Screenshot\x3c/a>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><span class=\"name\">File Should Exist\x3c/span>\x3c/td>\n<td>${OUTPUTDIR}/selenium-screenshot-1.png\x3c/td>\n\x3c/tr>\n<tr>\n<td>${path} =\x3c/td>\n<td><a href=\"#Capture%20Page%20Screenshot\" class=\"name\">Capture Page Screenshot\x3c/a>\x3c/td>\n\x3c/tr>\n<tr>\n<td><span class=\"name\">File Should Exist\x3c/span>\x3c/td>\n<td>${OUTPUTDIR}/selenium-screenshot-2.png\x3c/td>\n\x3c/tr>\n<tr>\n<td><span class=\"name\">File Should Exist\x3c/span>\x3c/td>\n<td>${path}\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Capture%20Page%20Screenshot\" class=\"name\">Capture Page Screenshot\x3c/a>\x3c/td>\n<td>custom_name.png\x3c/td>\n\x3c/tr>\n<tr>\n<td><span class=\"name\">File Should Exist\x3c/span>\x3c/td>\n<td>${OUTPUTDIR}/custom_name.png\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Capture%20Page%20Screenshot\" class=\"name\">Capture Page Screenshot\x3c/a>\x3c/td>\n<td>custom_with_index_{index}.png\x3c/td>\n\x3c/tr>\n<tr>\n<td><span class=\"name\">File Should Exist\x3c/span>\x3c/td>\n<td>${OUTPUTDIR}/custom_with_index_1.png\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Capture%20Page%20Screenshot\" class=\"name\">Capture Page Screenshot\x3c/a>\x3c/td>\n<td>formatted_index_{index:03}.png\x3c/td>\n\x3c/tr>\n<tr>\n<td><span class=\"name\">File Should Exist\x3c/span>\x3c/td>\n<td>${OUTPUTDIR}/formatted_index_001.png\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Capture Page Screenshot",
		"shortdoc": "Takes screenshot of the current page and embeds it into log file.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Verifies checkbox <code>locator\x3c/code> is selected/checked.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Checkbox Should Be Selected",
		"shortdoc": "Verifies checkbox ``locator`` is selected/checked.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Verifies checkbox <code>locator\x3c/code> is not selected/checked.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax..\x3c/p>",
		"matched": True,
		"name": "Checkbox Should Not Be Selected",
		"shortdoc": "Verifies checkbox ``locator`` is not selected/checked.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a> directly instead.\x3c/p>\n<p>In versions prior to SeleniumLibrary 3.0, the alert handling approach needed to be set separately before using the <a href=\"#Confirm%20Action\" class=\"name\">Confirm Action\x3c/a> keyword. New <a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a> keyword accepts the action how to handle the alert as a normal argument and should be used instead.\x3c/p>",
		"matched": True,
		"name": "Choose Cancel On Next Confirmation",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Handle Alert` directly instead.",
		"tags": []
	}, {
		"args": ["locator", "file_path"],
		"doc": "<p>Inputs the <code>file_path\x3c/code> into file input field <code>locator\x3c/code>.\x3c/p>\n<p>This keyword is most often used to input files into upload forms. The file specified with <code>file_path\x3c/code> must be available on machine where tests are executed.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Choose%20File\" class=\"name\">Choose File\x3c/a>\x3c/td>\n<td>my_upload_field\x3c/td>\n<td>${CURDIR}/trades.csv\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Choose File",
		"shortdoc": "Inputs the ``file_path`` into file input field ``locator``.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a> directly instead.\x3c/p>\n<p>In versions prior to SeleniumLibrary 3.0, the alert handling approach needed to be set separately before using the <a href=\"#Confirm%20Action\" class=\"name\">Confirm Action\x3c/a> keyword. New <a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a> keyword accepts the action how to handle the alert as a normal argument and should be used instead.\x3c/p>",
		"matched": True,
		"name": "Choose Ok On Next Confirmation",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Handle Alert` directly instead.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Clears the value of text entry element identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Clear Element Text",
		"shortdoc": "Clears the value of text entry element identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator", "modifier=False"],
		"doc": "<p>Clicks button identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax. When using the default locator strategy, buttons are searched using <code>id\x3c/code>, <code>name\x3c/code> and <code>value\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a> keyword for details about the <code>modifier\x3c/code> argument.\x3c/p>\n<p>The <code>modifier\x3c/code> argument is new in SeleniumLibrary 3.3\x3c/p>",
		"matched": True,
		"name": "Click Button",
		"shortdoc": "Clicks button identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator", "modifier=False"],
		"doc": "<p>Click element identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>The <code>modifier\x3c/code> argument can be used to pass <a href=\"https://seleniumhq.github.io/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html#selenium.webdriver.common.keys.Keys\">Selenium Keys\x3c/a> when clicking the element. The <span class=\"name\">+\x3c/span> can be used as a separator for different Selenium Keys. The <span class=\"name\">CTRL\x3c/span> is internally translated to <span class=\"name\">CONTROL\x3c/span> key. The <code>modifier\x3c/code> is space and case insensitive, example \"alt\" and \" aLt \" are supported formats to <a href=\"https://seleniumhq.github.io/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html#selenium.webdriver.common.keys.Keys.ALT\">ALT key\x3c/a> . If <code>modifier\x3c/code> does not match to Selenium Keys, keyword fails.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>Click Element\x3c/td>\n<td>id:button\x3c/td>\n<td>\x3c/td>\n<td># Would click element without any modifiers.\x3c/td>\n\x3c/tr>\n<tr>\n<td>Click Element\x3c/td>\n<td>id:button\x3c/td>\n<td>CTRL\x3c/td>\n<td># Would click element with CTLR key pressed down.\x3c/td>\n\x3c/tr>\n<tr>\n<td>Click Element\x3c/td>\n<td>id:button\x3c/td>\n<td>CTRL+ALT\x3c/td>\n<td># Would click element with CTLR and ALT keys pressed down.\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>The <code>modifier\x3c/code> argument is new in SeleniumLibrary 3.2\x3c/p>",
		"matched": True,
		"name": "Click Element",
		"shortdoc": "Click element identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator", "xoffset", "yoffset"],
		"doc": "<p>Click element <code>locator\x3c/code> at <code>xoffset/yoffset\x3c/code>.\x3c/p>\n<p>Cursor is moved and the center of the element and x/y coordinates are calculated from that point.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Click Element At Coordinates",
		"shortdoc": "Click element ``locator`` at ``xoffset/yoffset``.",
		"tags": []
	}, {
		"args": ["locator", "modifier=False"],
		"doc": "<p>Clicks an image identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax. When using the default locator strategy, images are searched using <code>id\x3c/code>, <code>name\x3c/code>, <code>src\x3c/code> and <code>alt\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a> keyword for details about the <code>modifier\x3c/code> argument.\x3c/p>\n<p>The <code>modifier\x3c/code> argument is new in SeleniumLibrary 3.3\x3c/p>",
		"matched": True,
		"name": "Click Image",
		"shortdoc": "Clicks an image identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator", "modifier=False"],
		"doc": "<p>Clicks a link identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax. When using the default locator strategy, links are searched using <code>id\x3c/code>, <code>name\x3c/code>, <code>href\x3c/code> and the link text.\x3c/p>\n<p>See the <a href=\"#Click%20Element\" class=\"name\">Click Element\x3c/a> keyword for details about the <code>modifier\x3c/code> argument.\x3c/p>\n<p>The <code>modifier\x3c/code> argument is new in SeleniumLibrary 3.3\x3c/p>",
		"matched": True,
		"name": "Click Link",
		"shortdoc": "Clicks a link identified by ``locator``.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Closes all open browsers and resets the browser cache.\x3c/p>\n<p>After this keyword new indexes returned from <a href=\"#Open%20Browser\" class=\"name\">Open Browser\x3c/a> keyword are reset to 1.\x3c/p>\n<p>This keyword should be used in test or suite teardown to make sure all browsers are closed.\x3c/p>",
		"matched": True,
		"name": "Close All Browsers",
		"shortdoc": "Closes all open browsers and resets the browser cache.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Closes the current browser.\x3c/p>",
		"matched": True,
		"name": "Close Browser",
		"shortdoc": "Closes the current browser.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Closes currently opened pop-up window.\x3c/p>",
		"matched": True,
		"name": "Close Window",
		"shortdoc": "Closes currently opened pop-up window.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a> instead.\x3c/p>\n<p>By default accepts an alert, but this behavior can be altered with <a href=\"#Choose%20Cancel%20On%20Next%20Confirmation\" class=\"name\">Choose Cancel On Next Confirmation\x3c/a> and <a href=\"#Choose%20Ok%20On%20Next%20Confirmation\" class=\"name\">Choose Ok On Next Confirmation\x3c/a> keywords. New <a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a> keyword accepts the action how to handle the alert as a normal argument and should be used instead.\x3c/p>",
		"matched": True,
		"name": "Confirm Action",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Handle Alert` instead.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Will cover elements identified by <code>locator\x3c/code> with a blue div without breaking page layout.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>New in SeleniumLibrary 3.3.0\x3c/p>\n<p>Example: |<a href=\"#Cover%20Element\" class=\"name\">Cover Element\x3c/a> | css:div#container |\x3c/p>",
		"matched": True,
		"name": "Cover Element",
		"shortdoc": "Will cover elements identified by ``locator`` with a blue div without breaking page layout.",
		"tags": []
	}, {
		"args": ["driver_name", "alias=None", "kwargs={}", "**init_kwargs"],
		"doc": "<p>Creates an instance of Selenium WebDriver.\x3c/p>\n<p>Like <a href=\"#Open%20Browser\" class=\"name\">Open Browser\x3c/a>, but allows passing arguments to the created WebDriver instance directly. This keyword should only be used if functionality provided by <a href=\"#Open%20Browser\" class=\"name\">Open Browser\x3c/a> is not adequate.\x3c/p>\n<p><code>driver_name\x3c/code> must be an WebDriver implementation name like Firefox, Chrome, Ie, Opera, Safari, PhantomJS, or Remote.\x3c/p>\n<p>The initialized WebDriver can be configured either with a Python dictionary <code>kwargs\x3c/code> or by using keyword arguments <code>**init_kwargs\x3c/code>. These arguments are passed directly to WebDriver without any processing. See <a href=\"https://seleniumhq.github.io/selenium/docs/api/py/api.html\">Selenium API documentation\x3c/a> for details about the supported arguments.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td># Use proxy with Firefox\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${proxy}=\x3c/td>\n<td><span class=\"name\">Evaluate\x3c/span>\x3c/td>\n<td>sys.modules['selenium.webdriver'].Proxy()\x3c/td>\n<td>sys, selenium.webdriver\x3c/td>\n\x3c/tr>\n<tr>\n<td>${proxy.http_proxy}=\x3c/td>\n<td><span class=\"name\">Set Variable\x3c/span>\x3c/td>\n<td>localhost:8888\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Create%20Webdriver\" class=\"name\">Create Webdriver\x3c/a>\x3c/td>\n<td>Firefox\x3c/td>\n<td>proxy=${proxy}\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td># Use proxy with PhantomJS\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${service args}=\x3c/td>\n<td><span class=\"name\">Create List\x3c/span>\x3c/td>\n<td>--proxy=192.168.132.104:8888\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Create%20Webdriver\" class=\"name\">Create Webdriver\x3c/a>\x3c/td>\n<td>PhantomJS\x3c/td>\n<td>service_args=${service args}\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>Returns the index of this browser instance which can be used later to switch back to it. Index starts from 1 and is reset back to it when <a href=\"#Close%20All%20Browsers\" class=\"name\">Close All Browsers\x3c/a> keyword is used. See <a href=\"#Switch%20Browser\" class=\"name\">Switch Browser\x3c/a> for an example.\x3c/p>",
		"matched": True,
		"name": "Create Webdriver",
		"shortdoc": "Creates an instance of Selenium WebDriver.",
		"tags": []
	}, {
		"args": ["text", "loglevel=TRACE"],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <a href=\"#Current%20Frame%20Should%20Contain\" class=\"name\">Current Frame Should Contain\x3c/a> instead.\x3c/p>",
		"matched": True,
		"name": "Current Frame Contains",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Current Frame Should Contain` instead.",
		"tags": []
	}, {
		"args": ["text", "loglevel=TRACE"],
		"doc": "<p>Verifies that current frame contains <code>text\x3c/code>.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain\" class=\"name\">Page Should Contain\x3c/a> for explanation about the <code>loglevel\x3c/code> argument.\x3c/p>\n<p>Prior to SeleniumLibrary 3.0 this keyword was named <a href=\"#Current%20Frame%20Contains\" class=\"name\">Current Frame Contains\x3c/a>.\x3c/p>",
		"matched": True,
		"name": "Current Frame Should Contain",
		"shortdoc": "Verifies that current frame contains ``text``.",
		"tags": []
	}, {
		"args": ["text", "loglevel=TRACE"],
		"doc": "<p>Verifies that current frame does not contains <code>text\x3c/code>.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain\" class=\"name\">Page Should Contain\x3c/a> for explanation about the <code>loglevel\x3c/code> argument.\x3c/p>",
		"matched": True,
		"name": "Current Frame Should Not Contain",
		"shortdoc": "Verifies that current frame does not contains ``text``.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Deletes all cookies.\x3c/p>",
		"matched": True,
		"name": "Delete All Cookies",
		"shortdoc": "Deletes all cookies.",
		"tags": []
	}, {
		"args": ["name"],
		"doc": "<p>Deletes cookie matching <code>name\x3c/code>.\x3c/p>\n<p>If the cookie is not found, nothing happens.\x3c/p>",
		"matched": True,
		"name": "Delete Cookie",
		"shortdoc": "Deletes cookie matching ``name``.",
		"tags": []
	}, {
		"args": ["accept=True"],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a> instead.\x3c/p>\n<p>Contrary to its name, this keyword accepts the alert by default (i.e. presses <code>Ok\x3c/code>). <code>accept\x3c/code> can be set to a false value to dismiss the alert (i.e. to press <code>Cancel\x3c/code>).\x3c/p>\n<p><a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a> has better support for controlling should the alert be accepted, dismissed, or left open.\x3c/p>",
		"matched": True,
		"name": "Dismiss Alert",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Handle Alert` instead.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Double click element identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Double Click Element",
		"shortdoc": "Double click element identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator", "target"],
		"doc": "<p>Drags element identified by <code>locator\x3c/code> into <code>target\x3c/code> element.\x3c/p>\n<p>The <code>locator\x3c/code> argument is the locator of the dragged element and the <code>target\x3c/code> is the locator of the target. See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Drag%20And%20Drop\" class=\"name\">Drag And Drop\x3c/a>\x3c/td>\n<td>css:div#element\x3c/td>\n<td>css:div.target\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Drag And Drop",
		"shortdoc": "Drags element identified by ``locator`` into ``target`` element.",
		"tags": []
	}, {
		"args": ["locator", "xoffset", "yoffset"],
		"doc": "<p>Drags element identified with <code>locator\x3c/code> by <code>xoffset/yoffset\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Element will be moved by <code>xoffset\x3c/code> and <code>yoffset\x3c/code>, each of which is a negative or positive number specifying the offset.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Drag%20And%20Drop%20By%20Offset\" class=\"name\">Drag And Drop By Offset\x3c/a>\x3c/td>\n<td>myElem\x3c/td>\n<td>50\x3c/td>\n<td>-35\x3c/td>\n<td># Move myElem 50px right and 35px down\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Drag And Drop By Offset",
		"shortdoc": "Drags element identified with ``locator`` by ``xoffset/yoffset``.",
		"tags": []
	}, {
		"args": ["locator", "attribute", "expected", "message=None"],
		"doc": "<p>Verifies element identified by <code>locator\x3c/code> contains expected attribute value.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Example: <a href=\"#Element%20Attribute%20Value%20Should%20Be\" class=\"name\">Element Attribute Value Should Be\x3c/a> | css:img | href | value\x3c/p>\n<p>New in SeleniumLibrary 3.2.\x3c/p>",
		"matched": True,
		"name": "Element Attribute Value Should Be",
		"shortdoc": "Verifies element identified by ``locator`` contains expected attribute value.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Verifies that element identified with <code>locator\x3c/code> is disabled.\x3c/p>\n<p>This keyword considers also elements that are read-only to be disabled.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Element Should Be Disabled",
		"shortdoc": "Verifies that element identified with ``locator`` is disabled.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Verifies that element identified with <code>locator\x3c/code> is enabled.\x3c/p>\n<p>This keyword considers also elements that are read-only to be disabled.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Element Should Be Enabled",
		"shortdoc": "Verifies that element identified with ``locator`` is enabled.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Verifies that element identified with <code>locator\x3c/code> is focused.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>New in SeleniumLibrary 3.0.\x3c/p>",
		"matched": True,
		"name": "Element Should Be Focused",
		"shortdoc": "Verifies that element identified with ``locator`` is focused.",
		"tags": []
	}, {
		"args": ["locator", "message=None"],
		"doc": "<p>Verifies that the element identified by <code>locator\x3c/code> is visible.\x3c/p>\n<p>Herein, visible means that the element is logically visible, not optically visible in the current browser viewport. For example, an element that carries <code>display:none\x3c/code> is not logically visible, so using this keyword on that element would fail.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>The <code>message\x3c/code> argument can be used to override the default error message.\x3c/p>",
		"matched": True,
		"name": "Element Should Be Visible",
		"shortdoc": "Verifies that the element identified by ``locator`` is visible.",
		"tags": []
	}, {
		"args": ["locator", "expected", "message=None", "ignore_case=False"],
		"doc": "<p>Verifies that element <code>locator\x3c/code> contains text <code>expected\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>The <code>message\x3c/code> argument can be used to override the default error message.\x3c/p>\n<p>The <code>ignore_case\x3c/code> argument can be set to True to compare case insensitive, default is False. New in SeleniumLibrary 3.1.\x3c/p>\n<p><code>ignore_case\x3c/code> argument new in SeleniumLibrary 3.1.\x3c/p>\n<p>Use <a href=\"#Element%20Text%20Should%20Be\" class=\"name\">Element Text Should Be\x3c/a> if you want to match the exact text, not a substring.\x3c/p>",
		"matched": True,
		"name": "Element Should Contain",
		"shortdoc": "Verifies that element ``locator`` contains text ``expected``.",
		"tags": []
	}, {
		"args": ["locator", "message=None"],
		"doc": "<p>Verifies that the element identified by <code>locator\x3c/code> is NOT visible.\x3c/p>\n<p>Passes if element does not exists. See <a href=\"#Element%20Should%20Be%20Visible\" class=\"name\">Element Should Be Visible\x3c/a> for more information about visibility and supported arguments.\x3c/p>",
		"matched": True,
		"name": "Element Should Not Be Visible",
		"shortdoc": "Verifies that the element identified by ``locator`` is NOT visible.",
		"tags": []
	}, {
		"args": ["locator", "expected", "message=None", "ignore_case=False"],
		"doc": "<p>Verifies that element <code>locator\x3c/code> does not contains text <code>expected\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>The <code>message\x3c/code> argument can be used to override the default error message.\x3c/p>\n<p>The <code>ignore_case\x3c/code> argument can be set to True to compare case insensitive, default is False.\x3c/p>\n<p><code>ignore_case\x3c/code> argument new in SeleniumLibrary 3.1.\x3c/p>",
		"matched": True,
		"name": "Element Should Not Contain",
		"shortdoc": "Verifies that element ``locator`` does not contains text ``expected``.",
		"tags": []
	}, {
		"args": ["locator", "expected", "message=None", "ignore_case=False"],
		"doc": "<p>Verifies that element <code>locator\x3c/code> contains exact text <code>expected\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>The <code>message\x3c/code> argument can be used to override the default error message.\x3c/p>\n<p>The <code>ignore_case\x3c/code> argument can be set to True to compare case insensitive, default is False.\x3c/p>\n<p><code>ignore_case\x3c/code> argument new in SeleniumLibrary 3.1.\x3c/p>\n<p>Use <a href=\"#Element%20Should%20Contain\" class=\"name\">Element Should Contain\x3c/a> if a substring match is desired.\x3c/p>",
		"matched": True,
		"name": "Element Text Should Be",
		"shortdoc": "Verifies that element ``locator`` contains exact text ``expected``.",
		"tags": []
	}, {
		"args": ["locator", "not_expected", "message=None", "ignore_case=False"],
		"doc": "<p>Verifies that element <code>locator\x3c/code> does not contain exact text <code>not_expected\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>The <code>message\x3c/code> argument can be used to override the default error message.\x3c/p>\n<p>The <code>ignore_case\x3c/code> argument can be set to True to compare case insensitive, default is False.\x3c/p>\n<p>New in SeleniumLibrary 3.1.1\x3c/p>",
		"matched": True,
		"name": "Element Text Should Not Be",
		"shortdoc": "Verifies that element ``locator`` does not contain exact text ``not_expected``.",
		"tags": []
	}, {
		"args": ["*code"],
		"doc": "<p>Executes asynchronous JavaScript code with possible arguments.\x3c/p>\n<p>Similar to <a href=\"#Execute%20Javascript\" class=\"name\">Execute Javascript\x3c/a> except that scripts executed with this keyword must explicitly signal they are finished by invoking the provided callback. This callback is always injected into the executed function as the last argument.\x3c/p>\n<p>Scripts must complete within the script timeout or this keyword will fail. See the <a href=\"#Timeout\" class=\"name\">Timeout\x3c/a> section for more information.\x3c/p>\n<p>Starting from SeleniumLibrary 3.2 it is possible to provide JavaScript <a href=\"https://seleniumhq.github.io/selenium/docs/api/py/webdriver_remote/selenium.webdriver.remote.webdriver.html#selenium.webdriver.remote.webdriver.WebDriver.execute_async_script\">arguments\x3c/a> as part of <code>code\x3c/code> argument. See <a href=\"#Execute%20Javascript\" class=\"name\">Execute Javascript\x3c/a> for more details.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Execute%20Async%20Javascript\" class=\"name\">Execute Async JavaScript\x3c/a>\x3c/td>\n<td>var callback = arguments[arguments.length - 1]; window.setTimeout(callback, 2000);\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Execute%20Async%20Javascript\" class=\"name\">Execute Async JavaScript\x3c/a>\x3c/td>\n<td>${CURDIR}/async_js_to_execute.js\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${result} =\x3c/td>\n<td><a href=\"#Execute%20Async%20Javascript\" class=\"name\">Execute Async JavaScript\x3c/a>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>...\x3c/td>\n<td>var callback = arguments[arguments.length - 1];\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>...\x3c/td>\n<td>function answer(){callback(\"text\");};\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>...\x3c/td>\n<td>window.setTimeout(answer, 2000);\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><span class=\"name\">Should Be Equal\x3c/span>\x3c/td>\n<td>${result}\x3c/td>\n<td>text\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Execute Async Javascript",
		"shortdoc": "Executes asynchronous JavaScript code with possible arguments.",
		"tags": []
	}, {
		"args": ["*code"],
		"doc": "<p>Executes the given JavaScript code with possible arguments.\x3c/p>\n<p><code>code\x3c/code> may be divided into multiple cells in the test data and <code>code\x3c/code> may contain multiple lines of code and arguments. In that case, the JavaScript code parts are concatenated together without adding spaces and optional arguments are separated from <code>code\x3c/code>.\x3c/p>\n<p>If <code>code\x3c/code> is a path to an existing file, the JavaScript to execute will be read from that file. Forward slashes work as a path separator on all operating systems.\x3c/p>\n<p>The JavaScript executes in the context of the currently selected frame or window as the body of an anonymous function. Use <code>window\x3c/code> to refer to the window of your application and <code>document\x3c/code> to refer to the document object of the current frame or window, e.g. <code>document.getElementById('example')\x3c/code>.\x3c/p>\n<p>This keyword returns whatever the executed JavaScript code returns. Return values are converted to the appropriate Python types.\x3c/p>\n<p>Starting from SeleniumLibrary 3.2 it is possible to provide JavaScript <a href=\"https://seleniumhq.github.io/selenium/docs/api/py/webdriver_remote/selenium.webdriver.remote.webdriver.html#selenium.webdriver.remote.webdriver.WebDriver.execute_script\">arguments\x3c/a> as part of <code>code\x3c/code> argument. The JavaScript code and arguments must be separated with <span class=\"name\">JAVASCRIPT\x3c/span> and <span class=\"name\">ARGUMENTS\x3c/span> markers and must used exactly with this format. If the Javascript code is first, then the <span class=\"name\">JAVASCRIPT\x3c/span> marker is optional. The order of <span class=\"name\">JAVASCRIPT\x3c/span> and <span class=\"name\">ARGUMENTS\x3c/span> markers can swapped, but if <span class=\"name\">ARGUMENTS\x3c/span> is first marker, then <span class=\"name\">JAVASCRIPT\x3c/span> marker is mandatory. It is only allowed to use <span class=\"name\">JAVASCRIPT\x3c/span> and <span class=\"name\">ARGUMENTS\x3c/span> markers only one time in the <code>code\x3c/code> argument.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Execute%20Javascript\" class=\"name\">Execute JavaScript\x3c/a>\x3c/td>\n<td>window.myFunc('arg1', 'arg2')\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Execute%20Javascript\" class=\"name\">Execute JavaScript\x3c/a>\x3c/td>\n<td>${CURDIR}/js_to_execute.js\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Execute%20Javascript\" class=\"name\">Execute JavaScript\x3c/a>\x3c/td>\n<td>alert(arguments[0]);\x3c/td>\n<td>ARGUMENTS\x3c/td>\n<td>123\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Execute%20Javascript\" class=\"name\">Execute JavaScript\x3c/a>\x3c/td>\n<td>ARGUMENTS\x3c/td>\n<td>123\x3c/td>\n<td>JAVASCRIPT\x3c/td>\n<td>alert(arguments[0]);\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Execute Javascript",
		"shortdoc": "Executes the given JavaScript code with possible arguments.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <a href=\"#Set%20Focus%20To%20Element\" class=\"name\">Set Focus To Element\x3c/a> instead.\x3c/p>",
		"matched": True,
		"name": "Focus",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Set Focus To Element` instead.",
		"tags": []
	}, {
		"args": ["locator", "text", "loglevel=TRACE"],
		"doc": "<p>Verifies that frame identified by <code>locator\x3c/code> contains <code>text\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain\" class=\"name\">Page Should Contain\x3c/a> for explanation about the <code>loglevel\x3c/code> argument.\x3c/p>",
		"matched": True,
		"name": "Frame Should Contain",
		"shortdoc": "Verifies that frame identified by ``locator`` contains ``text``.",
		"tags": []
	}, {
		"args": ["dismiss=True"],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a> instead.\x3c/p>\n<p>Returns the message the alert has. Dismisses the alert by default (i.e. presses <code>Cancel\x3c/code>) and setting <code>dismiss\x3c/code> to false leaves the alert open. There is no support to accept the alert (i.e. to press <code>Ok\x3c/code>).\x3c/p>\n<p><a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a> has better support for controlling should the alert be accepted, dismissed, or left open.\x3c/p>",
		"matched": True,
		"name": "Get Alert Message",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Handle Alert` instead.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Returns a list containing ids of all links found in current page.\x3c/p>\n<p>If a link has no id, an empty string will be in the list instead.\x3c/p>",
		"matched": True,
		"name": "Get All Links",
		"shortdoc": "Returns a list containing ids of all links found in current page.",
		"tags": []
	}, {
		"args": ["name"],
		"doc": "<p>Returns information of cookie with <code>name\x3c/code> as an object.\x3c/p>\n<p>If no cookie is found with <code>name\x3c/code>, keyword fails. The cookie object contains details about the cookie. Attributes available in the object are documented in the table below.\x3c/p>\n<table border=\"1\">\n<tr>\n<th>Attribute\x3c/th>\n<th>Explanation\x3c/th>\n\x3c/tr>\n<tr>\n<td>name\x3c/td>\n<td>The name of a cookie.\x3c/td>\n\x3c/tr>\n<tr>\n<td>value\x3c/td>\n<td>Value of the cookie.\x3c/td>\n\x3c/tr>\n<tr>\n<td>path\x3c/td>\n<td>Indicates a URL path, for example <code>/\x3c/code>.\x3c/td>\n\x3c/tr>\n<tr>\n<td>domain\x3c/td>\n<td>The domain the cookie is visible to.\x3c/td>\n\x3c/tr>\n<tr>\n<td>secure\x3c/td>\n<td>When True, cookie is only used with HTTPS connections.\x3c/td>\n\x3c/tr>\n<tr>\n<td>httpOnly\x3c/td>\n<td>When True, cookie is not accessible via JavaScript.\x3c/td>\n\x3c/tr>\n<tr>\n<td>expiry\x3c/td>\n<td>Python datetime object indicating when the cookie expires.\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>See the <a href=\"https://w3c.github.io/webdriver/webdriver-spec.html#cookies\">WebDriver specification\x3c/a> for details about the cookie information. Notice that <code>expiry\x3c/code> is specified as a <a href=\"https://docs.python.org/3/library/datetime.html#datetime.datetime\">datetime object\x3c/a>, not as seconds since Unix Epoch like WebDriver natively does.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Add%20Cookie\" class=\"name\">Add Cookie\x3c/a>\x3c/td>\n<td>foo\x3c/td>\n<td>bar\x3c/td>\n\x3c/tr>\n<tr>\n<td>${cookie} =\x3c/td>\n<td><a href=\"#Get%20Cookie\" class=\"name\">Get Cookie\x3c/a>\x3c/td>\n<td>foo\x3c/td>\n\x3c/tr>\n<tr>\n<td><span class=\"name\">Should Be Equal\x3c/span>\x3c/td>\n<td>${cookie.name}\x3c/td>\n<td>bar\x3c/td>\n\x3c/tr>\n<tr>\n<td><span class=\"name\">Should Be Equal\x3c/span>\x3c/td>\n<td>${cookie.value}\x3c/td>\n<td>foo\x3c/td>\n\x3c/tr>\n<tr>\n<td><span class=\"name\">Should Be True\x3c/span>\x3c/td>\n<td>${cookie.expiry.year} &gt; 2017\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>New in SeleniumLibrary 3.0.\x3c/p>",
		"matched": True,
		"name": "Get Cookie",
		"shortdoc": "Returns information of cookie with ``name`` as an object.",
		"tags": []
	}, {
		"args": ["name"],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <a href=\"#Get%20Cookie\" class=\"name\">Get Cookie\x3c/a> instead.\x3c/p>",
		"matched": True,
		"name": "Get Cookie Value",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Get Cookie` instead.",
		"tags": []
	}, {
		"args": ["as_dict=False"],
		"doc": "<p>Returns all cookies of the current page.\x3c/p>\n<p>If <code>as_dict\x3c/code> argument evaluates as false, see <a href=\"#Boolean%20arguments\" class=\"name\">Boolean arguments\x3c/a> for more details, then cookie information is returned as a single string in format <code>name1=value1; name2=value2; name3=value3\x3c/code>. When <code>as_dict\x3c/code> argument evaluates as True, cookie information is returned as Robot Framework dictionary format. The string format can be used, for example, for logging purposes or in headers when sending HTTP requests. The dictionary format is helpful when the result can be passed to requests library's Create Session keyword's optional cookies parameter.\x3c/p>\n<p>The <span class=\"name\">` as_dict\x3c/span>` argument is new in SeleniumLibrary 3.3\x3c/p>",
		"matched": True,
		"name": "Get Cookies",
		"shortdoc": "Returns all cookies of the current page.",
		"tags": []
	}, {
		"args": ["locator", "attribute"],
		"doc": "<p>Returns value of <code>attribute\x3c/code> from element <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${id}=\x3c/td>\n<td><a href=\"#Get%20Element%20Attribute\" class=\"name\">Get Element Attribute\x3c/a>\x3c/td>\n<td>css:h1\x3c/td>\n<td>id\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>Passing attribute name as part of the <code>locator\x3c/code> was removed in SeleniumLibrary 3.2. The explicit <code>attribute\x3c/code> argument should be used instead.\x3c/p>",
		"matched": True,
		"name": "Get Element Attribute",
		"shortdoc": "Returns value of ``attribute`` from element ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Returns number of elements matching <code>locator\x3c/code>.\x3c/p>\n<p>If you wish to assert the number of matching elements, use <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> with <code>limit\x3c/code> argument. Keyword will always return an integer.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${count} =\x3c/td>\n<td><a href=\"#Get%20Element%20Count\" class=\"name\">Get Element Count\x3c/a>\x3c/td>\n<td>name:div_name\x3c/td>\n\x3c/tr>\n<tr>\n<td><span class=\"name\">Should Be True\x3c/span>\x3c/td>\n<td>${count} &gt; 2\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>New in SeleniumLibrary 3.0.\x3c/p>",
		"matched": True,
		"name": "Get Element Count",
		"shortdoc": "Returns number of elements matching ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Returns width and height of element identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Both width and height are returned as integers.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${width}\x3c/td>\n<td>${height} =\x3c/td>\n<td><a href=\"#Get%20Element%20Size\" class=\"name\">Get Element Size\x3c/a>\x3c/td>\n<td>css:div#container\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Get Element Size",
		"shortdoc": "Returns width and height of element identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Returns horizontal position of element identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>The position is returned in pixels off the left side of the page, as an integer.\x3c/p>\n<p>See also <a href=\"#Get%20Vertical%20Position\" class=\"name\">Get Vertical Position\x3c/a>.\x3c/p>",
		"matched": True,
		"name": "Get Horizontal Position",
		"shortdoc": "Returns horizontal position of element identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator", "values=False"],
		"doc": "<p>Returns all labels or values of selection list <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Returns visible labels by default, but values can be returned by setting the <code>values\x3c/code> argument to a True value (see <a href=\"#Boolean%20arguments\" class=\"name\">Boolean arguments\x3c/a>).\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${labels} =\x3c/td>\n<td><a href=\"#Get%20List%20Items\" class=\"name\">Get List Items\x3c/a>\x3c/td>\n<td>mylist\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${values} =\x3c/td>\n<td><a href=\"#Get%20List%20Items\" class=\"name\">Get List Items\x3c/a>\x3c/td>\n<td>css:#example select\x3c/td>\n<td>values=True\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>Support to return values is new in SeleniumLibrary 3.0.\x3c/p>",
		"matched": True,
		"name": "Get List Items",
		"shortdoc": "Returns all labels or values of selection list ``locator``.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Returns the current browser URL.\x3c/p>",
		"matched": True,
		"name": "Get Location",
		"shortdoc": "Returns the current browser URL.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Returns and logs URLs of all known browser windows.\x3c/p>",
		"matched": True,
		"name": "Get Locations",
		"shortdoc": "Returns and logs URLs of all known browser windows.",
		"tags": []
	}, {
		"args": ["xpath", "return_str=True"],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <a href=\"#Get%20Element%20Count\" class=\"name\">Get Element Count\x3c/a> instead.\x3c/p>",
		"matched": True,
		"name": "Get Matching Xpath Count",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Get Element Count` instead.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Returns label of selected option from selection list <code>locator\x3c/code>.\x3c/p>\n<p>If there are multiple selected options, label of the first option is returned.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Get Selected List Label",
		"shortdoc": "Returns label of selected option from selection list ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Returns labels of selected options from selection list <code>locator\x3c/code>.\x3c/p>\n<p>Starting from SeleniumLibrary 3.0, returns an empty list if there are no selections. In earlier versions this caused an error.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Get Selected List Labels",
		"shortdoc": "Returns labels of selected options from selection list ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Returns value of selected option from selection list <code>locator\x3c/code>.\x3c/p>\n<p>If there are multiple selected options, value of the first option is returned.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Get Selected List Value",
		"shortdoc": "Returns value of selected option from selection list ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Returns values of selected options from selection list <code>locator\x3c/code>.\x3c/p>\n<p>Starting from SeleniumLibrary 3.0, returns an empty list if there are no selections. In earlier versions this caused an error.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Get Selected List Values",
		"shortdoc": "Returns values of selected options from selection list ``locator``.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Gets the implicit wait value used by Selenium.\x3c/p>\n<p>The value is returned as a human readable string like <code>1 second\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Implicit%20wait\" class=\"name\">Implicit wait\x3c/a> section above for more information.\x3c/p>",
		"matched": True,
		"name": "Get Selenium Implicit Wait",
		"shortdoc": "Gets the implicit wait value used by Selenium.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Gets the delay that is waited after each Selenium command.\x3c/p>\n<p>The value is returned as a human readable string like <code>1 second\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Selenium%20speed\" class=\"name\">Selenium Speed\x3c/a> section above for more information.\x3c/p>",
		"matched": True,
		"name": "Get Selenium Speed",
		"shortdoc": "Gets the delay that is waited after each Selenium command.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Gets the timeout that is used by various keywords.\x3c/p>\n<p>The value is returned as a human readable string like <code>1 second\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Timeout\" class=\"name\">Timeout\x3c/a> section above for more information.\x3c/p>",
		"matched": True,
		"name": "Get Selenium Timeout",
		"shortdoc": "Gets the timeout that is used by various keywords.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Returns the currently active browser session id.\x3c/p>\n<p>New in SeleniumLibrary 3.2\x3c/p>",
		"matched": True,
		"name": "Get Session Id",
		"shortdoc": "Returns the currently active browser session id.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Returns the entire HTML source of the current page or frame.\x3c/p>",
		"matched": True,
		"name": "Get Source",
		"shortdoc": "Returns the entire HTML source of the current page or frame.",
		"tags": []
	}, {
		"args": ["locator", "row", "column", "loglevel=TRACE"],
		"doc": "<p>Returns contents of table cell.\x3c/p>\n<p>The table is located using the <code>locator\x3c/code> argument and its cell found using <code>row\x3c/code> and <code>column\x3c/code>. See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Both row and column indexes start from 1, and header and footer rows are included in the count. It is possible to refer to rows and columns from the end by using negative indexes so that -1 is the last row/column, -2 is the second last, and so on.\x3c/p>\n<p>All <code>&lt;th&gt;\x3c/code> and <code>&lt;td&gt;\x3c/code> elements anywhere in the table are considered to be cells.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain\" class=\"name\">Page Should Contain\x3c/a> for explanation about the <code>loglevel\x3c/code> argument.\x3c/p>",
		"matched": True,
		"name": "Get Table Cell",
		"shortdoc": "Returns contents of table cell.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Returns the text value of element identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Get Text",
		"shortdoc": "Returns the text value of element identified by ``locator``.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Returns the title of current page.\x3c/p>",
		"matched": True,
		"name": "Get Title",
		"shortdoc": "Returns the title of current page.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Returns the value attribute of element identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Get Value",
		"shortdoc": "Returns the value attribute of element identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Returns vertical position of element identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>The position is returned in pixels off the top of the page, as an integer.\x3c/p>\n<p>See also <a href=\"#Get%20Horizontal%20Position\" class=\"name\">Get Horizontal Position\x3c/a>.\x3c/p>",
		"matched": True,
		"name": "Get Vertical Position",
		"shortdoc": "Returns vertical position of element identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Returns the first WebElement matching the given <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Get WebElement",
		"shortdoc": "Returns the first WebElement matching the given ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Returns list of WebElement objects matching the <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Starting from SeleniumLibrary 3.0, the keyword returns an empty list if there are no matching elements. In previous releases the keyword failed in this case.\x3c/p>",
		"matched": True,
		"name": "Get WebElements",
		"shortdoc": "Returns list of WebElement objects matching the ``locator``.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Return all current window handles as a list.\x3c/p>\n<p>Can be used as a list of windows to exclude with <a href=\"#Select%20Window\" class=\"name\">Select Window\x3c/a>.\x3c/p>\n<p>Prior to SeleniumLibrary 3.0, this keyword was named <a href=\"#List%20Windows\" class=\"name\">List Windows\x3c/a>.\x3c/p>",
		"matched": True,
		"name": "Get Window Handles",
		"shortdoc": "Return all current window handles as a list.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Returns and logs id attributes of all known browser windows.\x3c/p>",
		"matched": True,
		"name": "Get Window Identifiers",
		"shortdoc": "Returns and logs id attributes of all known browser windows.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Returns and logs names of all known browser windows.\x3c/p>",
		"matched": True,
		"name": "Get Window Names",
		"shortdoc": "Returns and logs names of all known browser windows.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Returns current window position.\x3c/p>\n<p>Position is relative to the top left corner of the screen. Returned values are integers. See also <a href=\"#Set%20Window%20Position\" class=\"name\">Set Window Position\x3c/a>.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${x}\x3c/td>\n<td>${y}=\x3c/td>\n<td><a href=\"#Get%20Window%20Position\" class=\"name\">Get Window Position\x3c/a>\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Get Window Position",
		"shortdoc": "Returns current window position.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Returns current window width and height as integers.\x3c/p>\n<p>See also <a href=\"#Set%20Window%20Size\" class=\"name\">Set Window Size\x3c/a>.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${width}\x3c/td>\n<td>${height}=\x3c/td>\n<td><a href=\"#Get%20Window%20Size\" class=\"name\">Get Window Size\x3c/a>\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Get Window Size",
		"shortdoc": "Returns current window width and height as integers.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Returns and logs titles of all known browser windows.\x3c/p>",
		"matched": True,
		"name": "Get Window Titles",
		"shortdoc": "Returns and logs titles of all known browser windows.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Simulates the user clicking the back button on their browser.\x3c/p>",
		"matched": True,
		"name": "Go Back",
		"shortdoc": "Simulates the user clicking the back button on their browser.",
		"tags": []
	}, {
		"args": ["url"],
		"doc": "<p>Navigates the active browser instance to the provided <code>url\x3c/code>.\x3c/p>",
		"matched": True,
		"name": "Go To",
		"shortdoc": "Navigates the active browser instance to the provided ``url``.",
		"tags": []
	}, {
		"args": ["action=ACCEPT", "timeout=None"],
		"doc": "<p>Handles the current alert and returns its message.\x3c/p>\n<p>By default the alert is accepted, but this can be controlled with the <code>action\x3c/code> argument that supports the following case-insensitive values:\x3c/p>\n<ul>\n<li><code>ACCEPT\x3c/code>: Accept the alert i.e. press <code>Ok\x3c/code>. Default.\x3c/li>\n<li><code>DISMISS\x3c/code>: Dismiss the alert i.e. press <code>Cancel\x3c/code>.\x3c/li>\n<li><code>LEAVE\x3c/code>: Leave the alert open.\x3c/li>\n\x3c/ul>\n<p>The <code>timeout\x3c/code> argument specifies how long to wait for the alert to appear. If it is not given, the global default <a href=\"#Timeout\" class=\"name\">timeout\x3c/a> is used instead.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>Handle Alert\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n<td># Accept alert.\x3c/td>\n\x3c/tr>\n<tr>\n<td>Handle Alert\x3c/td>\n<td>action=DISMISS\x3c/td>\n<td>\x3c/td>\n<td># Dismiss alert.\x3c/td>\n\x3c/tr>\n<tr>\n<td>Handle Alert\x3c/td>\n<td>timeout=10 s\x3c/td>\n<td>\x3c/td>\n<td># Use custom timeout and accept alert.\x3c/td>\n\x3c/tr>\n<tr>\n<td>Handle Alert\x3c/td>\n<td>DISMISS\x3c/td>\n<td>1 min\x3c/td>\n<td># Use custom timeout and dismiss alert.\x3c/td>\n\x3c/tr>\n<tr>\n<td>${message} =\x3c/td>\n<td>Handle Alert\x3c/td>\n<td>\x3c/td>\n<td># Accept alert and get its message.\x3c/td>\n\x3c/tr>\n<tr>\n<td>${message} =\x3c/td>\n<td>Handle Alert\x3c/td>\n<td>LEAVE\x3c/td>\n<td># Leave alert open and get its message.\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>New in SeleniumLibrary 3.0.\x3c/p>",
		"matched": True,
		"name": "Handle Alert",
		"shortdoc": "Handles the current alert and returns its message.",
		"tags": []
	}, {
		"args": ["locator", "password"],
		"doc": "<p>Types the given password into text field identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Difference compared to <a href=\"#Input%20Text\" class=\"name\">Input Text\x3c/a> is that this keyword does not log the given password on the INFO level. Notice that if you use the keyword like\x3c/p>\n<table border=\"1\">\n<tr>\n<td>Input Password\x3c/td>\n<td>password_field\x3c/td>\n<td>password\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>the password is shown as a normal keyword argument. A way to avoid that is using variables like\x3c/p>\n<table border=\"1\">\n<tr>\n<td>Input Password\x3c/td>\n<td>password_field\x3c/td>\n<td>${PASSWORD}\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>Notice also that SeleniumLibrary logs all the communication with browser drivers using the DEBUG level, and the actual password can be seen there. Additionally Robot Framework logs all arguments using the TRACE level. Tests must thus not be executed using level below INFO if password should not be logged in any format.\x3c/p>",
		"matched": True,
		"name": "Input Password",
		"shortdoc": "Types the given password into text field identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator", "text"],
		"doc": "<p>Types the given <code>text\x3c/code> into text field identified by <code>locator\x3c/code>.\x3c/p>\n<p>Use <a href=\"#Input%20Password\" class=\"name\">Input Password\x3c/a> if you do not want the given <code>text\x3c/code> to be logged.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Input Text",
		"shortdoc": "Types the given ``text`` into text field identified by ``locator``.",
		"tags": []
	}, {
		"args": ["text", "action=ACCEPT", "timeout=None"],
		"doc": "<p>Types the given <code>text\x3c/code> into an input field in an alert.\x3c/p>\n<p>The alert is accepted by default, but that behavior can be controlled by using the <code>action\x3c/code> argument same way as with <a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a>.\x3c/p>\n<p><code>timeout\x3c/code> specifies how long to wait for the alert to appear. If it is not given, the global default <a href=\"#Timeout\" class=\"name\">timeout\x3c/a> is used instead.\x3c/p>\n<p>New in SeleniumLibrary 3.0.\x3c/p>",
		"matched": True,
		"name": "Input Text Into Alert",
		"shortdoc": "Types the given ``text`` into an input field in an alert.",
		"tags": []
	}, {
		"args": ["text"],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <a href=\"#Input%20Text%20Into%20Alert\" class=\"name\">Input Text Into Alert\x3c/a> instead.\x3c/p>\n<p>Types the given <code>text\x3c/code> into an input field in an alert. Leaves the alert open.\x3c/p>",
		"matched": True,
		"name": "Input Text Into Prompt",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Input Text Into Alert` instead.",
		"tags": []
	}, {
		"args": ["locator", "*expected"],
		"doc": "<p>Verifies selection list <code>locator\x3c/code> has <code>expected\x3c/code> options selected.\x3c/p>\n<p>It is possible to give expected options both as visible labels and as values. Starting from SeleniumLibrary 3.0, mixing labels and values is not possible. Order of the selected options is not validated.\x3c/p>\n<p>If no expected options are given, validates that the list has no selections. A more explicit alternative is using <a href=\"#List%20Should%20Have%20No%20Selections\" class=\"name\">List Should Have No Selections\x3c/a>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#List%20Selection%20Should%20Be\" class=\"name\">List Selection Should Be\x3c/a>\x3c/td>\n<td>gender\x3c/td>\n<td>Female\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#List%20Selection%20Should%20Be\" class=\"name\">List Selection Should Be\x3c/a>\x3c/td>\n<td>interests\x3c/td>\n<td>Test Automation\x3c/td>\n<td>Python\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "List Selection Should Be",
		"shortdoc": "Verifies selection list ``locator`` has ``expected`` options selected.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Verifies selection list <code>locator\x3c/code> has no options selected.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "List Should Have No Selections",
		"shortdoc": "Verifies selection list ``locator`` has no options selected.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <a href=\"#Get%20Window%20Handles\" class=\"name\">Get Window Handles\x3c/a> instead.\x3c/p>",
		"matched": True,
		"name": "List Windows",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Get Window Handles` instead.",
		"tags": []
	}, {
		"args": ["url", "message=None"],
		"doc": "<p>Verifies that current URL is exactly <code>url\x3c/code>.\x3c/p>\n<p>The <code>url\x3c/code> argument contains the exact url that should exist in browser.\x3c/p>\n<p>The <code>message\x3c/code> argument can be used to override the default error message.\x3c/p>\n<p><code>message\x3c/code> argument new in SeleniumLibrary 3.2.0.\x3c/p>",
		"matched": True,
		"name": "Location Should Be",
		"shortdoc": "Verifies that current URL is exactly ``url``.",
		"tags": []
	}, {
		"args": ["expected", "message=None"],
		"doc": "<p>Verifies that current URL contains <code>expected\x3c/code>.\x3c/p>\n<p>The <code>url\x3c/code> argument contains the expected value in url.\x3c/p>\n<p>The <code>message\x3c/code> argument can be used to override the default error message.\x3c/p>\n<p><code>message\x3c/code> argument new in SeleniumLibrary 3.2.0.\x3c/p>",
		"matched": True,
		"name": "Location Should Contain",
		"shortdoc": "Verifies that current URL contains ``expected``.",
		"tags": []
	}, {
		"args": ["locator", "x", "message=None", "loglevel=TRACE"],
		"doc": "<p>Deprecated, use <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> with <code>limit\x3c/code> argument instead.\x3c/p>",
		"matched": True,
		"name": "Locator Should Match X Times",
		"shortdoc": "Deprecated, use `Page Should Contain Element` with ``limit`` argument instead.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Logs and returns the current URL.\x3c/p>",
		"matched": True,
		"name": "Log Location",
		"shortdoc": "Logs and returns the current URL.",
		"tags": []
	}, {
		"args": ["loglevel=INFO"],
		"doc": "<p>Logs and returns the HTML source of the current page or frame.\x3c/p>\n<p>The <code>loglevel\x3c/code> argument defines the used log level. Valid log levels are <code>WARN\x3c/code>, <code>INFO\x3c/code> (default), <code>DEBUG\x3c/code>, <code>TRACE\x3c/code> and <code>NONE\x3c/code> (no logging).\x3c/p>",
		"matched": True,
		"name": "Log Source",
		"shortdoc": "Logs and returns the HTML source of the current page or frame.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Logs and returns the title of current page.\x3c/p>",
		"matched": True,
		"name": "Log Title",
		"shortdoc": "Logs and returns the title of current page.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Maximizes current browser window.\x3c/p>",
		"matched": True,
		"name": "Maximize Browser Window",
		"shortdoc": "Maximizes current browser window.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Simulates pressing the left mouse button on the element <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>The element is pressed without releasing the mouse button.\x3c/p>\n<p>See also the more specific keywords <a href=\"#Mouse%20Down%20On%20Image\" class=\"name\">Mouse Down On Image\x3c/a> and <a href=\"#Mouse%20Down%20On%20Link\" class=\"name\">Mouse Down On Link\x3c/a>.\x3c/p>",
		"matched": True,
		"name": "Mouse Down",
		"shortdoc": "Simulates pressing the left mouse button on the element ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Simulates a mouse down event on an image identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax. When using the default locator strategy, images are searched using <code>id\x3c/code>, <code>name\x3c/code>, <code>src\x3c/code> and <code>alt\x3c/code>.\x3c/p>",
		"matched": True,
		"name": "Mouse Down On Image",
		"shortdoc": "Simulates a mouse down event on an image identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Simulates a mouse down event on a link identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax. When using the default locator strategy, links are searched using <code>id\x3c/code>, <code>name\x3c/code>, <code>href\x3c/code> and the link text.\x3c/p>",
		"matched": True,
		"name": "Mouse Down On Link",
		"shortdoc": "Simulates a mouse down event on a link identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Simulates moving mouse away from the element <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Mouse Out",
		"shortdoc": "Simulates moving mouse away from the element ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Simulates hovering mouse over the element <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Mouse Over",
		"shortdoc": "Simulates hovering mouse over the element ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Simulates releasing the left mouse button on the element <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Mouse Up",
		"shortdoc": "Simulates releasing the left mouse button on the element ``locator``.",
		"tags": []
	}, {
		"args": ["url", "browser=firefox", "alias=None", "remote_url=False", "desired_capabilities=None", "ff_profile_dir=None"],
		"doc": "<p>Opens a new browser instance to the given <code>url\x3c/code>.\x3c/p>\n<p>The <code>browser\x3c/code> argument specifies which browser to use, and the supported browser are listed in the table below. The browser names are case-insensitive and some browsers have multiple supported names.\x3c/p>\n<table border=\"1\">\n<tr>\n<th>Browser\x3c/th>\n<th>Name(s)\x3c/th>\n\x3c/tr>\n<tr>\n<td>Firefox\x3c/td>\n<td>firefox, ff\x3c/td>\n\x3c/tr>\n<tr>\n<td>Google Chrome\x3c/td>\n<td>googlechrome, chrome, gc\x3c/td>\n\x3c/tr>\n<tr>\n<td>Headless Firefox\x3c/td>\n<td>headlessfirefox\x3c/td>\n\x3c/tr>\n<tr>\n<td>Headless Chrome\x3c/td>\n<td>headlesschrome\x3c/td>\n\x3c/tr>\n<tr>\n<td>Internet Explorer\x3c/td>\n<td>internetexplorer, ie\x3c/td>\n\x3c/tr>\n<tr>\n<td>Edge\x3c/td>\n<td>edge\x3c/td>\n\x3c/tr>\n<tr>\n<td>Safari\x3c/td>\n<td>safari\x3c/td>\n\x3c/tr>\n<tr>\n<td>Opera\x3c/td>\n<td>opera\x3c/td>\n\x3c/tr>\n<tr>\n<td>Android\x3c/td>\n<td>android\x3c/td>\n\x3c/tr>\n<tr>\n<td>Iphone\x3c/td>\n<td>iphone\x3c/td>\n\x3c/tr>\n<tr>\n<td>PhantomJS\x3c/td>\n<td>phantomjs\x3c/td>\n\x3c/tr>\n<tr>\n<td>HTMLUnit\x3c/td>\n<td>htmlunit\x3c/td>\n\x3c/tr>\n<tr>\n<td>HTMLUnit with Javascript\x3c/td>\n<td>htmlunitwithjs\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>To be able to actually use one of these browsers, you need to have a matching Selenium browser driver available. See the <a href=\"https://github.com/robotframework/SeleniumLibrary#browser-drivers\">project documentation\x3c/a> for more details. Headless Firefox and Headless Chrome are new additions in SeleniumLibrary 3.1.0 and require Selenium 3.8.0 or newer.\x3c/p>\n<p>Optional <code>alias\x3c/code> is an alias given for this browser instance and it can be used for switching between browsers. An alternative approach for switching is using an index returned by this keyword. These indices start from 1, are incremented when new browsers are opened, and reset back to 1 when <a href=\"#Close%20All%20Browsers\" class=\"name\">Close All Browsers\x3c/a> is called. See <a href=\"#Switch%20Browser\" class=\"name\">Switch Browser\x3c/a> for more information and examples.\x3c/p>\n<p>Optional <code>remote_url\x3c/code> is the URL for a <a href=\"https://github.com/SeleniumHQ/selenium/wiki/Grid2\">Selenium Grid\x3c/a>.\x3c/p>\n<p>Optional <code>desired_capabilities\x3c/code> can be used to configure, for example, logging preferences for a browser or a browser and operating system when using <a href=\"http://saucelabs.com\">Sauce Labs\x3c/a>. Desired capabilities can be given either as a Python dictionary or as a string in format <code>key1:value1,key2:value2\x3c/code>. <a href=\"https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities\">Selenium documentation\x3c/a> lists possible capabilities that can be enabled.\x3c/p>\n<p>Optional <code>ff_profile_dir\x3c/code> is the path to the Firefox profile directory if you wish to overwrite the default profile Selenium uses. Notice that prior to SeleniumLibrary 3.0, the library contained its own profile that was used by default.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Open%20Browser\" class=\"name\">Open Browser\x3c/a>\x3c/td>\n<td><a href=\"http://example.com\">http://example.com\x3c/a>\x3c/td>\n<td>Chrome\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Open%20Browser\" class=\"name\">Open Browser\x3c/a>\x3c/td>\n<td><a href=\"http://example.com\">http://example.com\x3c/a>\x3c/td>\n<td>Firefox\x3c/td>\n<td>alias=Firefox\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Open%20Browser\" class=\"name\">Open Browser\x3c/a>\x3c/td>\n<td><a href=\"http://example.com\">http://example.com\x3c/a>\x3c/td>\n<td>Edge\x3c/td>\n<td>remote_url=http://127.0.0.1:4444/wd/hub\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>If the provided configuration options are not enough, it is possible to use <a href=\"#Create%20Webdriver\" class=\"name\">Create Webdriver\x3c/a> to customize browser initialization even more.\x3c/p>\n<p>Applying <code>desired_capabilities\x3c/code> argument also for local browser is new in SeleniumLibrary 3.1.\x3c/p>",
		"matched": True,
		"name": "Open Browser",
		"shortdoc": "Opens a new browser instance to the given ``url``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Opens context menu on element identified by <code>locator\x3c/code>.\x3c/p>",
		"matched": True,
		"name": "Open Context Menu",
		"shortdoc": "Opens context menu on element identified by ``locator``.",
		"tags": []
	}, {
		"args": ["text", "loglevel=TRACE"],
		"doc": "<p>Verifies that current page contains <code>text\x3c/code>.\x3c/p>\n<p>If this keyword fails, it automatically logs the page source using the log level specified with the optional <code>loglevel\x3c/code> argument. Valid log levels are <code>DEBUG\x3c/code>, <code>INFO\x3c/code> (default), <code>WARN\x3c/code>, and <code>NONE\x3c/code>. If the log level is <code>NONE\x3c/code> or below the current active log level the source will not be logged.\x3c/p>",
		"matched": True,
		"name": "Page Should Contain",
		"shortdoc": "Verifies that current page contains ``text``.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies button <code>locator\x3c/code> is found from current page.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax. When using the default locator strategy, buttons are searched using <code>id\x3c/code>, <code>name\x3c/code> and <code>value\x3c/code>.\x3c/p>",
		"matched": True,
		"name": "Page Should Contain Button",
		"shortdoc": "Verifies button ``locator`` is found from current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies checkbox <code>locator\x3c/code> is found from current page.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Page Should Contain Checkbox",
		"shortdoc": "Verifies checkbox ``locator`` is found from current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE", "limit=None"],
		"doc": "<p>Verifies that element <code>locator\x3c/code> is found on the current page.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>The <code>message\x3c/code> argument can be used to override the default error message.\x3c/p>\n<p>The <code>limit\x3c/code> argument can used to define how many elements the page should contain. When <code>limit\x3c/code> is <code>None\x3c/code> (default) page can contain one or more elements. When limit is a number, page must contain same number of elements.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain\" class=\"name\">Page Should Contain\x3c/a> for explanation about the <code>loglevel\x3c/code> argument.\x3c/p>\n<p>Examples assumes that locator matches to two elements.\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a>\x3c/td>\n<td>div_name\x3c/td>\n<td>limit=1\x3c/td>\n<td># Keyword fails.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a>\x3c/td>\n<td>div_name\x3c/td>\n<td>limit=2\x3c/td>\n<td># Keyword passes.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a>\x3c/td>\n<td>div_name\x3c/td>\n<td>limit=none\x3c/td>\n<td># None is considered one or more.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a>\x3c/td>\n<td>div_name\x3c/td>\n<td>\x3c/td>\n<td># Same as above.\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>The <code>limit\x3c/code> argument is new in SeleniumLibrary 3.0.\x3c/p>",
		"matched": True,
		"name": "Page Should Contain Element",
		"shortdoc": "Verifies that element ``locator`` is found on the current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies image identified by <code>locator\x3c/code> is found from current page.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax. When using the default locator strategy, images are searched using <code>id\x3c/code>, <code>name\x3c/code>, <code>src\x3c/code> and <code>alt\x3c/code>.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>",
		"matched": True,
		"name": "Page Should Contain Image",
		"shortdoc": "Verifies image identified by ``locator`` is found from current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies link identified by <code>locator\x3c/code> is found from current page.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax. When using the default locator strategy, links are searched using <code>id\x3c/code>, <code>name\x3c/code>, <code>href\x3c/code> and the link text.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>",
		"matched": True,
		"name": "Page Should Contain Link",
		"shortdoc": "Verifies link identified by ``locator`` is found from current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies selection list <code>locator\x3c/code> is found from current page.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Page Should Contain List",
		"shortdoc": "Verifies selection list ``locator`` is found from current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies radio button <code>locator\x3c/code> is found from current page.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax. When using the default locator strategy, radio buttons are searched using <code>id\x3c/code>, <code>name\x3c/code> and <code>value\x3c/code>.\x3c/p>",
		"matched": True,
		"name": "Page Should Contain Radio Button",
		"shortdoc": "Verifies radio button ``locator`` is found from current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies text field <code>locator\x3c/code> is found from current page.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Page Should Contain Textfield",
		"shortdoc": "Verifies text field ``locator`` is found from current page.",
		"tags": []
	}, {
		"args": ["text", "loglevel=TRACE"],
		"doc": "<p>Verifies the current page does not contain <code>text\x3c/code>.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain\" class=\"name\">Page Should Contain\x3c/a> for explanation about the <code>loglevel\x3c/code> argument.\x3c/p>",
		"matched": True,
		"name": "Page Should Not Contain",
		"shortdoc": "Verifies the current page does not contain ``text``.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies button <code>locator\x3c/code> is not found from current page.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax. When using the default locator strategy, buttons are searched using <code>id\x3c/code>, <code>name\x3c/code> and <code>value\x3c/code>.\x3c/p>",
		"matched": True,
		"name": "Page Should Not Contain Button",
		"shortdoc": "Verifies button ``locator`` is not found from current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies checkbox <code>locator\x3c/code> is not found from current page.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Page Should Not Contain Checkbox",
		"shortdoc": "Verifies checkbox ``locator`` is not found from current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies that element <code>locator\x3c/code> is found on the current page.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain\" class=\"name\">Page Should Contain\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>",
		"matched": True,
		"name": "Page Should Not Contain Element",
		"shortdoc": "Verifies that element ``locator`` is found on the current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies image identified by <code>locator\x3c/code> is found from current page.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax. When using the default locator strategy, images are searched using <code>id\x3c/code>, <code>name\x3c/code>, <code>src\x3c/code> and <code>alt\x3c/code>.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>",
		"matched": True,
		"name": "Page Should Not Contain Image",
		"shortdoc": "Verifies image identified by ``locator`` is found from current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies link identified by <code>locator\x3c/code> is not found from current page.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax. When using the default locator strategy, links are searched using <code>id\x3c/code>, <code>name\x3c/code>, <code>href\x3c/code> and the link text.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>",
		"matched": True,
		"name": "Page Should Not Contain Link",
		"shortdoc": "Verifies link identified by ``locator`` is not found from current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies selection list <code>locator\x3c/code> is not found from current page.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Page Should Not Contain List",
		"shortdoc": "Verifies selection list ``locator`` is not found from current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies radio button <code>locator\x3c/code> is not found from current page.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax. When using the default locator strategy, radio buttons are searched using <code>id\x3c/code>, <code>name\x3c/code> and <code>value\x3c/code>.\x3c/p>",
		"matched": True,
		"name": "Page Should Not Contain Radio Button",
		"shortdoc": "Verifies radio button ``locator`` is not found from current page.",
		"tags": []
	}, {
		"args": ["locator", "message=None", "loglevel=TRACE"],
		"doc": "<p>Verifies text field <code>locator\x3c/code> is not found from current page.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about <code>message\x3c/code> and <code>loglevel\x3c/code> arguments.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Page Should Not Contain Textfield",
		"shortdoc": "Verifies text field ``locator`` is not found from current page.",
		"tags": []
	}, {
		"args": ["locator", "key"],
		"doc": "<p>Deprecated use <a href=\"#Press%20Keys\" class=\"name\">Press Keys\x3c/a> instead.\x3c/p>",
		"matched": True,
		"name": "Press Key",
		"shortdoc": "Deprecated use `Press Keys` instead.",
		"tags": []
	}, {
		"args": ["locator=None", "*keys"],
		"doc": "<p>Simulates user pressing key(s) to an element or on the active browser.\x3c/p>\n<p>If <code>locator\x3c/code> evaluates as false, see <a href=\"#Boolean%20arguments\" class=\"name\">Boolean arguments\x3c/a> for more details, then the <code>keys\x3c/code> are sent to the currently active browser. Otherwise element is searched and <code>keys\x3c/code> are send to the element identified by the <code>locator\x3c/code>. In later case, keyword fails if element is not found. See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p><code>keys\x3c/code> arguments can contain one or many strings, but it can not be empty. <code>keys\x3c/code> can also be a combination of <a href=\"https://seleniumhq.github.io/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html\">Selenium Keys\x3c/a> and strings or a single Selenium Key. If Selenium Key is combined with strings, Selenium key and strings must be separated by the <span class=\"name\">+\x3c/span> character, like in <span class=\"name\">CONTROL+c\x3c/span>. Selenium Keys are space and case sensitive and Selenium Keys are not parsed inside of the string. Example AALTO, would send string <span class=\"name\">AALTO\x3c/span> and <span class=\"name\">ALT\x3c/span> not parsed inside of the string. But <span class=\"name\">A+ALT+O\x3c/span> would found Selenium ALT key from the <code>keys\x3c/code> argument. It also possible to press many Selenium Keys down at the same time, example 'ALT+ARROW_DOWN`.\x3c/p>\n<p>If Selenium Keys are detected in the <code>keys\x3c/code> argument, keyword will press the Selenium Key down, send the strings and then release the Selenium Key. If keyword needs to send a Selenium Key as a string, then each character must be separated with <span class=\"name\">+\x3c/span> character, example <span class=\"name\">E+N+D\x3c/span>.\x3c/p>\n<p><span class=\"name\">CTRL\x3c/span> is alias for <a href=\"https://seleniumhq.github.io/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html#selenium.webdriver.common.keys.Keys.CONTROL\">Selenium CONTROL\x3c/a> and ESC is alias for <a href=\"https://seleniumhq.github.io/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html#selenium.webdriver.common.keys.Keys.ESCAPE\">Selenium ESCAPE\x3c/a>\x3c/p>\n<p>New in SeleniumLibrary 3.3\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Press%20Keys\" class=\"name\">Press Keys\x3c/a>\x3c/td>\n<td>text_field\x3c/td>\n<td>AAAAA\x3c/td>\n<td>\x3c/td>\n<td># Sends string \"AAAAA\" to element.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Press%20Keys\" class=\"name\">Press Keys\x3c/a>\x3c/td>\n<td>None\x3c/td>\n<td>BBBBB\x3c/td>\n<td>\x3c/td>\n<td># Sends string \"BBBBB\" to currently active browser.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Press%20Keys\" class=\"name\">Press Keys\x3c/a>\x3c/td>\n<td>text_field\x3c/td>\n<td>E+N+D\x3c/td>\n<td>\x3c/td>\n<td># Sends string \"END\" to element.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Press%20Keys\" class=\"name\">Press Keys\x3c/a>\x3c/td>\n<td>text_field\x3c/td>\n<td>XXX\x3c/td>\n<td>YY\x3c/td>\n<td># Sends strings \"XXX\" and \"YY\" to element.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Press%20Keys\" class=\"name\">Press Keys\x3c/a>\x3c/td>\n<td>text_field\x3c/td>\n<td>XXX+YY\x3c/td>\n<td>\x3c/td>\n<td># Same as above.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Press%20Keys\" class=\"name\">Press Keys\x3c/a>\x3c/td>\n<td>text_field\x3c/td>\n<td>ALT+ARROW_DOWN\x3c/td>\n<td>\x3c/td>\n<td># Pressing \"ALT\" key down, then pressing ARROW_DOWN and then releasing both keys.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Press%20Keys\" class=\"name\">Press Keys\x3c/a>\x3c/td>\n<td>text_field\x3c/td>\n<td>ALT\x3c/td>\n<td>ARROW_DOWN\x3c/td>\n<td># Pressing \"ALT\" key and then pressing ARROW_DOWN.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Press%20Keys\" class=\"name\">Press Keys\x3c/a>\x3c/td>\n<td>text_field\x3c/td>\n<td>CTRL+c\x3c/td>\n<td>\x3c/td>\n<td># Pressing CTRL key down, sends string \"c\" and then releases CTRL key.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Press%20Keys\" class=\"name\">Press Keys\x3c/a>\x3c/td>\n<td>button\x3c/td>\n<td>RETURN\x3c/td>\n<td>\x3c/td>\n<td># Pressing \"ENTER\" key to element.\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Press Keys",
		"shortdoc": "Simulates user pressing key(s) to an element or on the active browser.",
		"tags": []
	}, {
		"args": ["group_name", "value"],
		"doc": "<p>Verifies radio button group <code>group_name\x3c/code> is set to <code>value\x3c/code>.\x3c/p>\n<p><code>group_name\x3c/code> is the <code>name\x3c/code> of the radio button group.\x3c/p>",
		"matched": True,
		"name": "Radio Button Should Be Set To",
		"shortdoc": "Verifies radio button group ``group_name`` is set to ``value``.",
		"tags": []
	}, {
		"args": ["group_name"],
		"doc": "<p>Verifies radio button group <code>group_name\x3c/code> has no selection.\x3c/p>\n<p><code>group_name\x3c/code> is the <code>name\x3c/code> of the radio button group.\x3c/p>",
		"matched": True,
		"name": "Radio Button Should Not Be Selected",
		"shortdoc": "Verifies radio button group ``group_name`` has no selection.",
		"tags": []
	}, {
		"args": ["keyword"],
		"doc": "<p>Sets the keyword to execute when a SeleniumLibrary keyword fails.\x3c/p>\n<p><code>keyword\x3c/code> is the name of a keyword that will be executed if a SeleniumLibrary keyword fails. It is possible to use any available keyword, including user keywords or keywords from other libraries, but the keyword must not take any arguments.\x3c/p>\n<p>The initial keyword to use is set when <a href=\"#Importing\" class=\"name\">importing\x3c/a> the library, and the keyword that is used by default is <a href=\"#Capture%20Page%20Screenshot\" class=\"name\">Capture Page Screenshot\x3c/a>. Taking a screenshot when something failed is a very useful feature, but notice that it can slow down the execution.\x3c/p>\n<p>It is possible to use string <code>NOTHING\x3c/code> or <code>NONE\x3c/code>, case-insensitively, as well as Python <code>None\x3c/code> to disable this feature altogether.\x3c/p>\n<p>This keyword returns the name of the previously registered failure keyword or Python <code>None\x3c/code> if this functionality was previously disabled. The return value can be always used to restore the original value later.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Register%20Keyword%20To%20Run%20On%20Failure\" class=\"name\">Register Keyword To Run On Failure\x3c/a>\x3c/td>\n<td>Log Source\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${previous kw}=\x3c/td>\n<td><a href=\"#Register%20Keyword%20To%20Run%20On%20Failure\" class=\"name\">Register Keyword To Run On Failure\x3c/a>\x3c/td>\n<td>NONE\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Register%20Keyword%20To%20Run%20On%20Failure\" class=\"name\">Register Keyword To Run On Failure\x3c/a>\x3c/td>\n<td>${previous kw}\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>Changes in SeleniumLibrary 3.0:\x3c/p>\n<ul>\n<li>Possible to use string <code>NONE\x3c/code> or Python <code>None\x3c/code> to disable the functionality.\x3c/li>\n<li>Return Python <code>None\x3c/code> when the functionality was disabled earlier. In previous versions special value <code>No Keyword\x3c/code> was returned and it could not be used to restore the original state.\x3c/li>\n\x3c/ul>",
		"matched": True,
		"name": "Register Keyword To Run On Failure",
		"shortdoc": "Sets the keyword to execute when a SeleniumLibrary keyword fails.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Simulates user reloading page.\x3c/p>",
		"matched": True,
		"name": "Reload Page",
		"shortdoc": "Simulates user reloading page.",
		"tags": []
	}, {
		"args": ["strategy_name"],
		"doc": "<p>Removes a previously added custom location strategy.\x3c/p>\n<p>See <a href=\"#Custom%20locators\" class=\"name\">Custom locators\x3c/a> for information how to create and use custom strategies.\x3c/p>",
		"matched": True,
		"name": "Remove Location Strategy",
		"shortdoc": "Removes a previously added custom location strategy.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Scrolls an element identified by <code>locator\x3c/code> into view.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>New in SeleniumLibrary 3.2.0\x3c/p>",
		"matched": True,
		"name": "Scroll Element Into View",
		"shortdoc": "Scrolls an element identified by ``locator`` into view.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Selects all options from multi-selection list <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Select All From List",
		"shortdoc": "Selects all options from multi-selection list ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Selects checkbox identified by <code>locator\x3c/code>.\x3c/p>\n<p>Does nothing if checkbox is already selected.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Select Checkbox",
		"shortdoc": "Selects checkbox identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Sets frame identified by <code>locator\x3c/code> as the current frame.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Works both with frames and iframes. Use <a href=\"#Unselect%20Frame\" class=\"name\">Unselect Frame\x3c/a> to cancel the frame selection and return to the main frame.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Select%20Frame\" class=\"name\">Select Frame\x3c/a>\x3c/td>\n<td>top-frame\x3c/td>\n<td># Select frame with id or name 'top-frame'\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Click%20Link\" class=\"name\">Click Link\x3c/a>\x3c/td>\n<td>example\x3c/td>\n<td># Click link 'example' in the selected frame\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Unselect%20Frame\" class=\"name\">Unselect Frame\x3c/a>\x3c/td>\n<td>\x3c/td>\n<td># Back to main frame.\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Select%20Frame\" class=\"name\">Select Frame\x3c/a>\x3c/td>\n<td>//iframe[@name='xxx']\x3c/td>\n<td># Select frame using xpath\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Select Frame",
		"shortdoc": "Sets frame identified by ``locator`` as the current frame.",
		"tags": []
	}, {
		"args": ["locator", "*options"],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <span class=\"name\">Select From List By Label/Value/Index\x3c/span> instead.\x3c/p>\n<p>This keyword selects options based on labels or values, which makes it very complicated and slow. It has been deprecated in SeleniumLibrary 3.0, and dedicated keywords <a href=\"#Select%20From%20List%20By%20Label\" class=\"name\">Select From List By Label\x3c/a>, <a href=\"#Select%20From%20List%20By%20Value\" class=\"name\">Select From List By Value\x3c/a> and <a href=\"#Select%20From%20List%20By%20Index\" class=\"name\">Select From List By Index\x3c/a> should be used instead.\x3c/p>",
		"matched": True,
		"name": "Select From List",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Select From List By Label/Value/Index` instead.",
		"tags": []
	}, {
		"args": ["locator", "*indexes"],
		"doc": "<p>Selects options from selection list <code>locator\x3c/code> by <code>indexes\x3c/code>.\x3c/p>\n<p>Indexes of list options start from 0.\x3c/p>\n<p>If more than one option is given for a single-selection list, the last value will be selected. With multi-selection lists all specified options are selected, but possible old selections are not cleared.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Select From List By Index",
		"shortdoc": "Selects options from selection list ``locator`` by ``indexes``.",
		"tags": []
	}, {
		"args": ["locator", "*labels"],
		"doc": "<p>Selects options from selection list <code>locator\x3c/code> by <code>labels\x3c/code>.\x3c/p>\n<p>If more than one option is given for a single-selection list, the last value will be selected. With multi-selection lists all specified options are selected, but possible old selections are not cleared.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Select From List By Label",
		"shortdoc": "Selects options from selection list ``locator`` by ``labels``.",
		"tags": []
	}, {
		"args": ["locator", "*values"],
		"doc": "<p>Selects options from selection list <code>locator\x3c/code> by <code>values\x3c/code>.\x3c/p>\n<p>If more than one option is given for a single-selection list, the last value will be selected. With multi-selection lists all specified options are selected, but possible old selections are not cleared.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Select From List By Value",
		"shortdoc": "Selects options from selection list ``locator`` by ``values``.",
		"tags": []
	}, {
		"args": ["group_name", "value"],
		"doc": "<p>Sets radio button group <code>group_name\x3c/code> to <code>value\x3c/code>.\x3c/p>\n<p>The radio button to be selected is located by two arguments:\x3c/p>\n<ul>\n<li><code>group_name\x3c/code> is the name of the radio button group.\x3c/li>\n<li><code>value\x3c/code> is the <code>id\x3c/code> or <code>value\x3c/code> attribute of the actual radio button.\x3c/li>\n\x3c/ul>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Select%20Radio%20Button\" class=\"name\">Select Radio Button\x3c/a>\x3c/td>\n<td>size\x3c/td>\n<td>XL\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Select%20Radio%20Button\" class=\"name\">Select Radio Button\x3c/a>\x3c/td>\n<td>contact\x3c/td>\n<td>email\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Select Radio Button",
		"shortdoc": "Sets radio button group ``group_name`` to ``value``.",
		"tags": []
	}, {
		"args": ["locator=MAIN", "timeout=None"],
		"doc": "<p>Selects browser window matching <code>locator\x3c/code>.\x3c/p>\n<p>If the window is found, all subsequent commands use the selected window, until this keyword is used again. If the window is not found, this keyword fails. The previous window handle is returned, and can be used to return back to it later.\x3c/p>\n<p>Notice that in this context <i>window\x3c/i> means a pop-up window opened when doing something on an existing window. It is not possible to select windows opened with <a href=\"#Open%20Browser\" class=\"name\">Open Browser\x3c/a>, <a href=\"#Switch%20Browser\" class=\"name\">Switch Browser\x3c/a> must be used instead. Notice also that alerts should be handled with <a href=\"#Handle%20Alert\" class=\"name\">Handle Alert\x3c/a> or other alert related keywords.\x3c/p>\n<p>The <code>locator\x3c/code> can be specified using different strategies somewhat similarly as when <a href=\"#Locating%20elements\" class=\"name\">locating elements\x3c/a> on pages.\x3c/p>\n<ul>\n<li>By default the <code>locator\x3c/code> is matched against window handle, name, title, and URL. Matching is done in that order and the the first matching window is selected.\x3c/li>\n\x3c/ul>\n<ul>\n<li>The <code>locator\x3c/code> can specify an explicit strategy by using format <code>strategy:value\x3c/code> (recommended) or <code>strategy=value\x3c/code>. Supported strategies are <code>name\x3c/code>, <code>title\x3c/code> and <code>url\x3c/code>, which match windows using name, title, and URL, respectively. Additionally, <code>default\x3c/code> can be used to explicitly use the default strategy explained above.\x3c/li>\n\x3c/ul>\n<ul>\n<li>If the <code>locator\x3c/code> is <code>NEW\x3c/code> (case-insensitive), the latest opened window is selected. It is an error if this is the same as the current window.\x3c/li>\n\x3c/ul>\n<ul>\n<li>If the <code>locator\x3c/code> is <code>MAIN\x3c/code> (default, case-insensitive), the main window is selected.\x3c/li>\n\x3c/ul>\n<ul>\n<li>If the <code>locator\x3c/code> is <code>CURRENT\x3c/code> (case-insensitive), nothing is done. This effectively just returns the current window handle.\x3c/li>\n\x3c/ul>\n<ul>\n<li>If the <code>locator\x3c/code> is not a string, it is expected to be a list of window handles <i>to exclude\x3c/i>. Such a list of excluded windows can be get from <a href=\"#Get%20Window%20Handles\" class=\"name\">Get Window Handles\x3c/a> prior to doing an action that opens a new window.\x3c/li>\n\x3c/ul>\n<p>The <code>timeout\x3c/code> is used to specify how long keyword will poll to select the new window. The <code>timeout\x3c/code> is new in SeleniumLibrary 3.2.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Click%20Link\" class=\"name\">Click Link\x3c/a>\x3c/td>\n<td>popup1\x3c/td>\n<td>\x3c/td>\n<td># Open new window\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Select%20Window\" class=\"name\">Select Window\x3c/a>\x3c/td>\n<td>example\x3c/td>\n<td>\x3c/td>\n<td># Select window using default strategy\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Title%20Should%20Be\" class=\"name\">Title Should Be\x3c/a>\x3c/td>\n<td>Pop-up 1\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Click%20Button\" class=\"name\">Click Button\x3c/a>\x3c/td>\n<td>popup2\x3c/td>\n<td>\x3c/td>\n<td># Open another window\x3c/td>\n\x3c/tr>\n<tr>\n<td>${handle} =\x3c/td>\n<td><a href=\"#Select%20Window\" class=\"name\">Select Window\x3c/a>\x3c/td>\n<td>NEW\x3c/td>\n<td># Select latest opened window\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Title%20Should%20Be\" class=\"name\">Title Should Be\x3c/a>\x3c/td>\n<td>Pop-up 2\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Select%20Window\" class=\"name\">Select Window\x3c/a>\x3c/td>\n<td>${handle}\x3c/td>\n<td>\x3c/td>\n<td># Select window using handle\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Title%20Should%20Be\" class=\"name\">Title Should Be\x3c/a>\x3c/td>\n<td>Pop-up 1\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Select%20Window\" class=\"name\">Select Window\x3c/a>\x3c/td>\n<td>MAIN\x3c/td>\n<td>\x3c/td>\n<td># Select the main window\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Title%20Should%20Be\" class=\"name\">Title Should Be\x3c/a>\x3c/td>\n<td>Main\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td>${excludes} =\x3c/td>\n<td><a href=\"#Get%20Window%20Handles\" class=\"name\">Get Window Handles\x3c/a>\x3c/td>\n<td>\x3c/td>\n<td># Get list of current windows\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Click%20Link\" class=\"name\">Click Link\x3c/a>\x3c/td>\n<td>popup3\x3c/td>\n<td>\x3c/td>\n<td># Open one more window\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Select%20Window\" class=\"name\">Select Window\x3c/a>\x3c/td>\n<td>${excludes}\x3c/td>\n<td>\x3c/td>\n<td># Select window using excludes\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Title%20Should%20Be\" class=\"name\">Title Should Be\x3c/a>\x3c/td>\n<td>Pop-up 3\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p><b>NOTE:\x3c/b>\x3c/p>\n<ul>\n<li>The <code>strategy:value\x3c/code> syntax is only supported by SeleniumLibrary 3.0 and newer.\x3c/li>\n<li>Prior to SeleniumLibrary 3.0 matching windows by name, title and URL was case-insensitive.\x3c/li>\n<li>Earlier versions supported aliases <code>None\x3c/code>, <code>null\x3c/code> and the empty string for selecting the main window, and alias <code>self\x3c/code> for selecting the current window. Support for these aliases were removed in SeleniumLibrary 3.2.\x3c/li>\n\x3c/ul>",
		"matched": True,
		"name": "Select Window",
		"shortdoc": "Selects browser window matching ``locator``.",
		"tags": []
	}, {
		"args": ["value"],
		"doc": "<p>Sets the implicit wait value used by Selenium.\x3c/p>\n<p>Same as <a href=\"#Set%20Selenium%20Implicit%20Wait\" class=\"name\">Set Selenium Implicit Wait\x3c/a> but only affects the current browser.\x3c/p>",
		"matched": True,
		"name": "Set Browser Implicit Wait",
		"shortdoc": "Sets the implicit wait value used by Selenium.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Sets focus to element identified by <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Prior to SeleniumLibrary 3.0 this keyword was named <a href=\"#Focus\" class=\"name\">Focus\x3c/a>.\x3c/p>",
		"matched": True,
		"name": "Set Focus To Element",
		"shortdoc": "Sets focus to element identified by ``locator``.",
		"tags": []
	}, {
		"args": ["path"],
		"doc": "<p>Sets the directory for captured screenshots.\x3c/p>\n<p><code>path\x3c/code> argument specifies the absolute path to a directory where the screenshots should be written to. If the directory does not exist, it will be created. The directory can also be set when <a href=\"#Importing\" class=\"name\">importing\x3c/a> the library. If it is not configured anywhere, screenshots are saved to the same directory where Robot Framework's log file is written.\x3c/p>\n<p><code>persist\x3c/code> argument is deprecated and has no effect.\x3c/p>\n<p>The previous value is returned and can be used to restore the original value later if needed.\x3c/p>\n<p>Returning the previous value is new in SeleniumLibrary 3.0. The persist argument was removed in SeleniumLibrary 3.2.\x3c/p>",
		"matched": True,
		"name": "Set Screenshot Directory",
		"shortdoc": "Sets the directory for captured screenshots.",
		"tags": []
	}, {
		"args": ["value"],
		"doc": "<p>Sets the implicit wait value used by Selenium.\x3c/p>\n<p>The value can be given as a number that is considered to be seconds or as a human readable string like <code>1 second\x3c/code>. The previous value is returned and can be used to restore the original value later if needed.\x3c/p>\n<p>This keyword sets the implicit wait for all opened browsers. Use <a href=\"#Set%20Browser%20Implicit%20Wait\" class=\"name\">Set Browser Implicit Wait\x3c/a> to set it only to the current browser.\x3c/p>\n<p>See the <a href=\"#Implicit%20wait\" class=\"name\">Implicit wait\x3c/a> section above for more information.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${orig wait} =\x3c/td>\n<td><a href=\"#Set%20Selenium%20Implicit%20Wait\" class=\"name\">Set Selenium Implicit Wait\x3c/a>\x3c/td>\n<td>10 seconds\x3c/td>\n\x3c/tr>\n<tr>\n<td><span class=\"name\">Perform AJAX call that is slow\x3c/span>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Set%20Selenium%20Implicit%20Wait\" class=\"name\">Set Selenium Implicit Wait\x3c/a>\x3c/td>\n<td>${orig wait}\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Set Selenium Implicit Wait",
		"shortdoc": "Sets the implicit wait value used by Selenium.",
		"tags": []
	}, {
		"args": ["value"],
		"doc": "<p>Sets the delay that is waited after each Selenium command.\x3c/p>\n<p>The value can be given as a number that is considered to be seconds or as a human readable string like <code>1 second\x3c/code>. The previous value is returned and can be used to restore the original value later if needed.\x3c/p>\n<p>See the <a href=\"#Selenium%20speed\" class=\"name\">Selenium Speed\x3c/a> section above for more information.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Set%20Selenium%20Speed\" class=\"name\">Set Selenium Speed\x3c/a>\x3c/td>\n<td>0.5 seconds\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Set Selenium Speed",
		"shortdoc": "Sets the delay that is waited after each Selenium command.",
		"tags": []
	}, {
		"args": ["value"],
		"doc": "<p>Sets the timeout that is used by various keywords.\x3c/p>\n<p>The value can be given as a number that is considered to be seconds or as a human readable string like <code>1 second\x3c/code>. The previous value is returned and can be used to restore the original value later if needed.\x3c/p>\n<p>See the <a href=\"#Timeout\" class=\"name\">Timeout\x3c/a> section above for more information.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${orig timeout} =\x3c/td>\n<td><a href=\"#Set%20Selenium%20Timeout\" class=\"name\">Set Selenium Timeout\x3c/a>\x3c/td>\n<td>15 seconds\x3c/td>\n\x3c/tr>\n<tr>\n<td><span class=\"name\">Open page that loads slowly\x3c/span>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Set%20Selenium%20Timeout\" class=\"name\">Set Selenium Timeout\x3c/a>\x3c/td>\n<td>${orig timeout}\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Set Selenium Timeout",
		"shortdoc": "Sets the timeout that is used by various keywords.",
		"tags": []
	}, {
		"args": ["x", "y"],
		"doc": "<p>Sets window position using <code>x\x3c/code> and <code>y\x3c/code> coordinates.\x3c/p>\n<p>The position is relative to the top left corner of the screen, but some browsers exclude possible task bar set by the operating system from the calculation. The actual position may thus be different with different browsers.\x3c/p>\n<p>Values can be given using strings containing numbers or by using actual numbers. See also <a href=\"#Get%20Window%20Position\" class=\"name\">Get Window Position\x3c/a>.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Set%20Window%20Position\" class=\"name\">Set Window Position\x3c/a>\x3c/td>\n<td>100\x3c/td>\n<td>200\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Set Window Position",
		"shortdoc": "Sets window position using ``x`` and ``y`` coordinates.",
		"tags": []
	}, {
		"args": ["width", "height"],
		"doc": "<p>Sets current windows size to given <code>width\x3c/code> and <code>height\x3c/code>.\x3c/p>\n<p>Values can be given using strings containing numbers or by using actual numbers. See also <a href=\"#Get%20Window%20Size\" class=\"name\">Get Window Size\x3c/a>.\x3c/p>\n<p>Browsers have a limit how small they can be set. Trying to set them smaller will cause the actual size to be bigger than the requested size.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Set%20Window%20Size\" class=\"name\">Set Window Size\x3c/a>\x3c/td>\n<td>800\x3c/td>\n<td>600\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Set Window Size",
		"shortdoc": "Sets current windows size to given ``width`` and ``height``.",
		"tags": []
	}, {
		"args": ["locator", "event"],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <a href=\"#Simulate%20Event\" class=\"name\">Simulate Event\x3c/a> instead.\x3c/p>",
		"matched": True,
		"name": "Simulate",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Simulate Event` instead.",
		"tags": []
	}, {
		"args": ["locator", "event"],
		"doc": "<p>Simulates <code>event\x3c/code> on element identified by <code>locator\x3c/code>.\x3c/p>\n<p>This keyword is useful if element has <code>OnEvent\x3c/code> handler that needs to be explicitly invoked.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Prior to SeleniumLibrary 3.0 this keyword was named <a href=\"#Simulate\" class=\"name\">Simulate\x3c/a>.\x3c/p>",
		"matched": True,
		"name": "Simulate Event",
		"shortdoc": "Simulates ``event`` on element identified by ``locator``.",
		"tags": []
	}, {
		"args": ["locator=None"],
		"doc": "<p>Submits a form identified by <code>locator\x3c/code>.\x3c/p>\n<p>If <code>locator\x3c/code> is not given, first form on the page is submitted.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Submit Form",
		"shortdoc": "Submits a form identified by ``locator``.",
		"tags": []
	}, {
		"args": ["index_or_alias"],
		"doc": "<p>Switches between active browsers using <code>index_or_alias\x3c/code>.\x3c/p>\n<p>Indices are returned by the <a href=\"#Open%20Browser\" class=\"name\">Open Browser\x3c/a> keyword and aliases can be given to it explicitly. Indices start from 1.\x3c/p>\n<p>Example:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Open%20Browser\" class=\"name\">Open Browser\x3c/a>\x3c/td>\n<td><a href=\"http://google.com\">http://google.com\x3c/a>\x3c/td>\n<td>ff\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Location%20Should%20Be\" class=\"name\">Location Should Be\x3c/a>\x3c/td>\n<td><a href=\"http://google.com\">http://google.com\x3c/a>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Open%20Browser\" class=\"name\">Open Browser\x3c/a>\x3c/td>\n<td><a href=\"http://yahoo.com\">http://yahoo.com\x3c/a>\x3c/td>\n<td>ie\x3c/td>\n<td>alias=second\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Location%20Should%20Be\" class=\"name\">Location Should Be\x3c/a>\x3c/td>\n<td><a href=\"http://yahoo.com\">http://yahoo.com\x3c/a>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Switch%20Browser\" class=\"name\">Switch Browser\x3c/a>\x3c/td>\n<td>1\x3c/td>\n<td># index\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Page%20Should%20Contain\" class=\"name\">Page Should Contain\x3c/a>\x3c/td>\n<td>I'm feeling lucky\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Switch%20Browser\" class=\"name\">Switch Browser\x3c/a>\x3c/td>\n<td>second\x3c/td>\n<td># alias\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Page%20Should%20Contain\" class=\"name\">Page Should Contain\x3c/a>\x3c/td>\n<td>More Yahoo!\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Close%20All%20Browsers\" class=\"name\">Close All Browsers\x3c/a>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>\n<p>Above example expects that there was no other open browsers when opening the first one because it used index <code>1\x3c/code> when switching to it later. If you are not sure about that, you can store the index into a variable as below.\x3c/p>\n<table border=\"1\">\n<tr>\n<td>${index} =\x3c/td>\n<td><a href=\"#Open%20Browser\" class=\"name\">Open Browser\x3c/a>\x3c/td>\n<td><a href=\"http://google.com\">http://google.com\x3c/a>\x3c/td>\n\x3c/tr>\n<tr>\n<td># Do something ...\x3c/td>\n<td>\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Switch%20Browser\" class=\"name\">Switch Browser\x3c/a>\x3c/td>\n<td>${index}\x3c/td>\n<td>\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Switch Browser",
		"shortdoc": "Switches between active browsers using ``index_or_alias``.",
		"tags": []
	}, {
		"args": ["locator", "row", "column", "expected", "loglevel=TRACE"],
		"doc": "<p>Verifies table cell contains text <code>expected\x3c/code>.\x3c/p>\n<p>See <a href=\"#Get%20Table%20Cell\" class=\"name\">Get Table Cell\x3c/a> that this keyword uses internally for explanation about accepted arguments.\x3c/p>",
		"matched": True,
		"name": "Table Cell Should Contain",
		"shortdoc": "Verifies table cell contains text ``expected``.",
		"tags": []
	}, {
		"args": ["locator", "column", "expected", "loglevel=TRACE"],
		"doc": "<p>Verifies table column contains text <code>expected\x3c/code>.\x3c/p>\n<p>The table is located using the <code>locator\x3c/code> argument and its column found using <code>column\x3c/code>. See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Column indexes start from 1. It is possible to refer to columns from the end by using negative indexes so that -1 is the last column, -2 is the second last, and so on.\x3c/p>\n<p>If a table contains cells that span multiple columns, those merged cells count as a single column.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about the <code>loglevel\x3c/code> argument.\x3c/p>",
		"matched": True,
		"name": "Table Column Should Contain",
		"shortdoc": "Verifies table column contains text ``expected``.",
		"tags": []
	}, {
		"args": ["locator", "expected", "loglevel=TRACE"],
		"doc": "<p>Verifies table footer contains text <code>expected\x3c/code>.\x3c/p>\n<p>Any <code>&lt;td&gt;\x3c/code> element inside <code>&lt;tfoot&gt;\x3c/code> element is considered to be part of the footer.\x3c/p>\n<p>The table is located using the <code>locator\x3c/code> argument. See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about the <code>loglevel\x3c/code> argument.\x3c/p>",
		"matched": True,
		"name": "Table Footer Should Contain",
		"shortdoc": "Verifies table footer contains text ``expected``.",
		"tags": []
	}, {
		"args": ["locator", "expected", "loglevel=TRACE"],
		"doc": "<p>Verifies table header contains text <code>expected\x3c/code>.\x3c/p>\n<p>Any <code>&lt;th&gt;\x3c/code> element anywhere in the table is considered to be part of the header.\x3c/p>\n<p>The table is located using the <code>locator\x3c/code> argument. See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about the <code>loglevel\x3c/code> argument.\x3c/p>",
		"matched": True,
		"name": "Table Header Should Contain",
		"shortdoc": "Verifies table header contains text ``expected``.",
		"tags": []
	}, {
		"args": ["locator", "row", "expected", "loglevel=TRACE"],
		"doc": "<p>Verifies that table row contains text <code>expected\x3c/code>.\x3c/p>\n<p>The table is located using the <code>locator\x3c/code> argument and its column found using <code>column\x3c/code>. See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>Row indexes start from 1. It is possible to refer to rows from the end by using negative indexes so that -1 is the last row, -2 is the second last, and so on.\x3c/p>\n<p>If a table contains cells that span multiple rows, a match only occurs for the uppermost row of those merged cells.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about the <code>loglevel\x3c/code> argument.\x3c/p>",
		"matched": True,
		"name": "Table Row Should Contain",
		"shortdoc": "Verifies that table row contains text ``expected``.",
		"tags": []
	}, {
		"args": ["locator", "expected", "loglevel=TRACE"],
		"doc": "<p>Verifies table contains text <code>expected\x3c/code>.\x3c/p>\n<p>The table is located using the <code>locator\x3c/code> argument. See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>See <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> for explanation about the <code>loglevel\x3c/code> argument.\x3c/p>",
		"matched": True,
		"name": "Table Should Contain",
		"shortdoc": "Verifies table contains text ``expected``.",
		"tags": []
	}, {
		"args": ["locator", "expected", "message=None"],
		"doc": "<p>Verifies text area <code>locator\x3c/code> contains text <code>expected\x3c/code>.\x3c/p>\n<p><code>message\x3c/code> can be used to override default error message.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Textarea Should Contain",
		"shortdoc": "Verifies text area ``locator`` contains text ``expected``.",
		"tags": []
	}, {
		"args": ["locator", "expected", "message=None"],
		"doc": "<p>Verifies text area <code>locator\x3c/code> has exactly text <code>expected\x3c/code>.\x3c/p>\n<p><code>message\x3c/code> can be used to override default error message.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Textarea Value Should Be",
		"shortdoc": "Verifies text area ``locator`` has exactly text ``expected``.",
		"tags": []
	}, {
		"args": ["locator", "expected", "message=None"],
		"doc": "<p>Verifies text field <code>locator\x3c/code> contains text <code>expected\x3c/code>.\x3c/p>\n<p><code>message\x3c/code> can be used to override the default error message.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Textfield Should Contain",
		"shortdoc": "Verifies text field ``locator`` contains text ``expected``.",
		"tags": []
	}, {
		"args": ["locator", "expected", "message=None"],
		"doc": "<p>Verifies text field <code>locator\x3c/code> has exactly text <code>expected\x3c/code>.\x3c/p>\n<p><code>message\x3c/code> can be used to override default error message.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Textfield Value Should Be",
		"shortdoc": "Verifies text field ``locator`` has exactly text ``expected``.",
		"tags": []
	}, {
		"args": ["title", "message=None"],
		"doc": "<p>Verifies that current page title equals <code>title\x3c/code>.\x3c/p>\n<p>The <code>message\x3c/code> argument can be used to override the default error message.\x3c/p>\n<p><code>message\x3c/code> argument is new in SeleniumLibrary 3.1.\x3c/p>",
		"matched": True,
		"name": "Title Should Be",
		"shortdoc": "Verifies that current page title equals ``title``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Unselects all options from multi-selection list <code>locator\x3c/code>.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p>New in SeleniumLibrary 3.0.\x3c/p>",
		"matched": True,
		"name": "Unselect All From List",
		"shortdoc": "Unselects all options from multi-selection list ``locator``.",
		"tags": []
	}, {
		"args": ["locator"],
		"doc": "<p>Removes selection of checkbox identified by <code>locator\x3c/code>.\x3c/p>\n<p>Does nothing if the checkbox is not selected.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Unselect Checkbox",
		"shortdoc": "Removes selection of checkbox identified by ``locator``.",
		"tags": []
	}, {
		"args": [],
		"doc": "<p>Sets the main frame as the current frame.\x3c/p>\n<p>In practice cancels the previous <a href=\"#Select%20Frame\" class=\"name\">Select Frame\x3c/a> call.\x3c/p>",
		"matched": True,
		"name": "Unselect Frame",
		"shortdoc": "Sets the main frame as the current frame.",
		"tags": []
	}, {
		"args": ["locator", "*items"],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <span class=\"name\">Unselect From List By Label/Value/Index\x3c/span> instead.\x3c/p>\n<p>This keyword unselects options based on labels or values, which makes it very complicated and slow. It has been deprecated in SeleniumLibrary 3.0, and dedicated keywords <a href=\"#Unselect%20From%20List%20By%20Label\" class=\"name\">Unselect From List By Label\x3c/a>, <a href=\"#Unselect%20From%20List%20By%20Value\" class=\"name\">Unselect From List By Value\x3c/a> and <a href=\"#Unselect%20From%20List%20By%20Index\" class=\"name\">Unselect From List By Index\x3c/a> should be used instead.\x3c/p>",
		"matched": True,
		"name": "Unselect From List",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Unselect From List By Label/Value/Index` instead.",
		"tags": []
	}, {
		"args": ["locator", "*indexes"],
		"doc": "<p>Unselects options from selection list <code>locator\x3c/code> by <code>indexes\x3c/code>.\x3c/p>\n<p>Indexes of list options start from 0. This keyword works only with multi-selection lists.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Unselect From List By Index",
		"shortdoc": "Unselects options from selection list ``locator`` by ``indexes``.",
		"tags": []
	}, {
		"args": ["locator", "*labels"],
		"doc": "<p>Unselects options from selection list <code>locator\x3c/code> by <code>labels\x3c/code>.\x3c/p>\n<p>This keyword works only with multi-selection lists.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Unselect From List By Label",
		"shortdoc": "Unselects options from selection list ``locator`` by ``labels``.",
		"tags": []
	}, {
		"args": ["locator", "*values"],
		"doc": "<p>Unselects options from selection list <code>locator\x3c/code> by <code>values\x3c/code>.\x3c/p>\n<p>This keyword works only with multi-selection lists.\x3c/p>\n<p>See the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>",
		"matched": True,
		"name": "Unselect From List By Value",
		"shortdoc": "Unselects options from selection list ``locator`` by ``values``.",
		"tags": []
	}, {
		"args": ["condition", "timeout=None", "error=None"],
		"doc": "<p>Waits until <code>condition\x3c/code> is True or <code>timeout\x3c/code> expires.\x3c/p>\n<p>The condition can be arbitrary JavaScript expression but it must return a value to be evaluated. See <a href=\"#Execute%20Javascript\" class=\"name\">Execute JavaScript\x3c/a> for information about accessing content on pages.\x3c/p>\n<p>Fails if the timeout expires before the condition becomes True. See the <span class=\"name\">Timeouts\x3c/span> section for more information about using timeouts and their default value.\x3c/p>\n<p><code>error\x3c/code> can be used to override the default error message.\x3c/p>\n<p>Examples:\x3c/p>\n<table border=\"1\">\n<tr>\n<td><a href=\"#Wait%20For%20Condition\" class=\"name\">Wait For Condition\x3c/a>\x3c/td>\n<td>return document.title == \"New Title\"\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Wait%20For%20Condition\" class=\"name\">Wait For Condition\x3c/a>\x3c/td>\n<td>return jQuery.active == 0\x3c/td>\n\x3c/tr>\n<tr>\n<td><a href=\"#Wait%20For%20Condition\" class=\"name\">Wait For Condition\x3c/a>\x3c/td>\n<td>style = document.querySelector('h1').style; return style.background == \"red\" &amp;&amp; style.color == \"white\"\x3c/td>\n\x3c/tr>\n\x3c/table>",
		"matched": True,
		"name": "Wait For Condition",
		"shortdoc": "Waits until ``condition`` is True or ``timeout`` expires.",
		"tags": []
	}, {
		"args": ["locator", "text", "timeout=None", "error=None"],
		"doc": "<p>Waits until element <code>locator\x3c/code> contains <code>text\x3c/code>.\x3c/p>\n<p>Fails if <code>timeout\x3c/code> expires before the text appears. See the <span class=\"name\">Timeouts\x3c/span> section for more information about using timeouts and their default value and the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p><code>error\x3c/code> can be used to override the default error message.\x3c/p>",
		"matched": True,
		"name": "Wait Until Element Contains",
		"shortdoc": "Waits until element ``locator`` contains ``text``.",
		"tags": []
	}, {
		"args": ["locator", "text", "timeout=None", "error=None"],
		"doc": "<p>Waits until element <code>locator\x3c/code> does not contain <code>text\x3c/code>.\x3c/p>\n<p>Fails if <code>timeout\x3c/code> expires before the text disappears. See the <span class=\"name\">Timeouts\x3c/span> section for more information about using timeouts and their default value and the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p><code>error\x3c/code> can be used to override the default error message.\x3c/p>",
		"matched": True,
		"name": "Wait Until Element Does Not Contain",
		"shortdoc": "Waits until element ``locator`` does not contain ``text``.",
		"tags": []
	}, {
		"args": ["locator", "timeout=None", "error=None"],
		"doc": "<p>Waits until element <code>locator\x3c/code> is enabled.\x3c/p>\n<p>Element is considered enabled if it is not disabled nor read-only.\x3c/p>\n<p>Fails if <code>timeout\x3c/code> expires before the element is enabled. See the <span class=\"name\">Timeouts\x3c/span> section for more information about using timeouts and their default value and the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p><code>error\x3c/code> can be used to override the default error message.\x3c/p>\n<p>Considering read-only elements to be disabled is a new feature in SeleniumLibrary 3.0.\x3c/p>",
		"matched": True,
		"name": "Wait Until Element Is Enabled",
		"shortdoc": "Waits until element ``locator`` is enabled.",
		"tags": []
	}, {
		"args": ["locator", "timeout=None", "error=None"],
		"doc": "<p>Waits until element <code>locator\x3c/code> is not visible.\x3c/p>\n<p>Fails if <code>timeout\x3c/code> expires before the element is not visible. See the <span class=\"name\">Timeouts\x3c/span> section for more information about using timeouts and their default value and the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p><code>error\x3c/code> can be used to override the default error message.\x3c/p>",
		"matched": True,
		"name": "Wait Until Element Is Not Visible",
		"shortdoc": "Waits until element ``locator`` is not visible.",
		"tags": []
	}, {
		"args": ["locator", "timeout=None", "error=None"],
		"doc": "<p>Waits until element <code>locator\x3c/code> is visible.\x3c/p>\n<p>Fails if <code>timeout\x3c/code> expires before the element is visible. See the <span class=\"name\">Timeouts\x3c/span> section for more information about using timeouts and their default value and the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p><code>error\x3c/code> can be used to override the default error message.\x3c/p>",
		"matched": True,
		"name": "Wait Until Element Is Visible",
		"shortdoc": "Waits until element ``locator`` is visible.",
		"tags": []
	}, {
		"args": ["text", "timeout=None", "error=None"],
		"doc": "<p>Waits until <code>text\x3c/code> appears on current page.\x3c/p>\n<p>Fails if <code>timeout\x3c/code> expires before the text appears. See the <span class=\"name\">Timeouts\x3c/span> section for more information about using timeouts and their default value.\x3c/p>\n<p><code>error\x3c/code> can be used to override the default error message.\x3c/p>",
		"matched": True,
		"name": "Wait Until Page Contains",
		"shortdoc": "Waits until ``text`` appears on current page.",
		"tags": []
	}, {
		"args": ["locator", "timeout=None", "error=None"],
		"doc": "<p>Waits until element <code>locator\x3c/code> appears on current page.\x3c/p>\n<p>Fails if <code>timeout\x3c/code> expires before the element appears. See the <span class=\"name\">Timeouts\x3c/span> section for more information about using timeouts and their default value and the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p><code>error\x3c/code> can be used to override the default error message.\x3c/p>",
		"matched": True,
		"name": "Wait Until Page Contains Element",
		"shortdoc": "Waits until element ``locator`` appears on current page.",
		"tags": []
	}, {
		"args": ["text", "timeout=None", "error=None"],
		"doc": "<p>Waits until <code>text\x3c/code> disappears from current page.\x3c/p>\n<p>Fails if <code>timeout\x3c/code> expires before the text disappears. See the <span class=\"name\">Timeouts\x3c/span> section for more information about using timeouts and their default value.\x3c/p>\n<p><code>error\x3c/code> can be used to override the default error message.\x3c/p>",
		"matched": True,
		"name": "Wait Until Page Does Not Contain",
		"shortdoc": "Waits until ``text`` disappears from current page.",
		"tags": []
	}, {
		"args": ["locator", "timeout=None", "error=None"],
		"doc": "<p>Waits until element <code>locator\x3c/code> disappears from current page.\x3c/p>\n<p>Fails if <code>timeout\x3c/code> expires before the element disappears. See the <span class=\"name\">Timeouts\x3c/span> section for more information about using timeouts and their default value and the <a href=\"#Locating%20elements\" class=\"name\">Locating elements\x3c/a> section for details about the locator syntax.\x3c/p>\n<p><code>error\x3c/code> can be used to override the default error message.\x3c/p>",
		"matched": True,
		"name": "Wait Until Page Does Not Contain Element",
		"shortdoc": "Waits until element ``locator`` disappears from current page.",
		"tags": []
	}, {
		"args": ["xpath", "x", "message=None", "loglevel=TRACE"],
		"doc": "<p><b>DEPRECATED in SeleniumLibrary 3.2.\x3c/b> Use <a href=\"#Page%20Should%20Contain%20Element\" class=\"name\">Page Should Contain Element\x3c/a> with <code>limit\x3c/code> argument instead.\x3c/p>",
		"matched": True,
		"name": "Xpath Should Match X Times",
		"shortdoc": "*DEPRECATED in SeleniumLibrary 3.2.* Use `Page Should Contain Element` with ``limit`` argument instead.",
		"tags": []
	}],
	"name": "SeleniumLibrary",
	"named_args": True,
	"scope": "global",
	"version": "3.3.1"
};
