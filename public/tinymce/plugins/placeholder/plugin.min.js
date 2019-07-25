/**
 * Placeholder for TinyMCE.
 *
 * This plugin provides placeholder functionality for TinyMCE.
 *
 * @link   https://github.com/baangfilip/tinymce-placeholder
 * @author baangfilip.
 * @since  2018-06-30
 * @version 0.1
 * @preserve
 */
tinymce.PluginManager.add("placeholder",function(editor,url){var element;editor.on("init",function(evt){if(editor.settings.inline){element=editor.getElement()}else{element=editor.contentAreaContainer}element.classList.add("plugin-placeholder");if(element.getAttribute("placeholder")===null){element.setAttribute("placeholder",editor.settings.placeholder||editor.getElement().getAttribute("placeholder"))}if(document.getElementById("plugin-placeholder")===null){addPlaceholderStyles()}element.addEventListener("click",function(){editor.execCommand("mceFocus",false,element)})});editor.on("selectionchange init",function(evt){if(editor.getContent()==""){element.classList.add("empty")}else{element.classList.remove("empty")}});function addPlaceholderStyles(){var head=document.head||document.getElementsByTagName("head")[0];var css=document.createElement("style");css.id="plugin-placeholder";css.type="text/css";css.innerHTML="             .plugin-placeholder:before {                 display: none;                 position: absolute;                 content: attr(placeholder);                 -webkit-margin-before: 1em;                 -webkit-margin-after: 1em;                 -webkit-margin-start: 0px;                 -webkit-margin-end: 0px;                 color:#454545;                 font-style:italic;             }             .mce-panel.plugin-placeholder:before{                 margin-left:8px;             }             .plugin-placeholder iframe { z-index: 2; }             .plugin-placeholder.empty:before{                 display:block;             }";head.appendChild(css)}});