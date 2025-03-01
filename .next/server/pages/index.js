/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "(pages-dir-node)/./components/AddExpense.tsx":
/*!***********************************!*\
  !*** ./components/AddExpense.tsx ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _firebaseConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../firebaseConfig */ \"(pages-dir-node)/./firebaseConfig.ts\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var _styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/components/AddExpense.module.sass */ \"(pages-dir-node)/./styles/components/AddExpense.module.sass\");\n/* harmony import */ var _styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_firebaseConfig__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__]);\n([_firebaseConfig__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n// Категории расходов\nconst categories = [\n    {\n        name: \"Transport\",\n        color: \"#FFC107\"\n    },\n    {\n        name: \"Food\",\n        color: \"#FF5722\"\n    },\n    {\n        name: \"Entertainment\",\n        color: \"#9C27B0\"\n    },\n    {\n        name: \"Outfit\",\n        color: \"#2196F3\"\n    },\n    {\n        name: \"Gifts\",\n        color: \"#E91E63\"\n    },\n    {\n        name: \"Subscriptions\",\n        color: \"#4CAF50\"\n    },\n    {\n        name: \"Education\",\n        color: \"#03A9F4\"\n    },\n    {\n        name: \"Health\",\n        color: \"#8BC34A\"\n    },\n    {\n        name: \"Household\",\n        color: \"#FF9800\"\n    },\n    {\n        name: \"Transfer\",\n        color: \"#795548\"\n    },\n    {\n        name: \"Lending\",\n        color: \"#607D8B\"\n    },\n    {\n        name: \"Other\",\n        color: \"#000000\"\n    }\n];\nconst AddExpense = ({ onAddExpense, onClose })=>{\n    const [selectedCategory, setSelectedCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [amount, setAmount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const handleSaveExpense = async ()=>{\n        if (!amount || !selectedCategory) return;\n        const category = categories.find((c)=>c.name === selectedCategory);\n        if (!category) return;\n        try {\n            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.addDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_2__.db, \"expenses\"), {\n                category: selectedCategory,\n                amount: parseFloat(amount),\n                color: category.color,\n                timestamp: new Date()\n            });\n            // Сбрасываем поля\n            setSelectedCategory(null);\n            setAmount(\"\");\n            // Закрываем модалку после успешного сохранения\n            onClose();\n        } catch (error) {\n            console.error(\"Error adding expense: \", error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4___default().container),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (_styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4___default().window),\n            children: !selectedCategory ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: (_styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4___default().title),\n                        children: \"Add Expense\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\AddExpense.tsx\",\n                        lineNumber: 61,\n                        columnNumber: 13\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4___default().table),\n                        children: categories.map((category)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: (_styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4___default().point),\n                                onClick: ()=>setSelectedCategory(category.name),\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        style: {\n                                            backgroundColor: category.color\n                                        },\n                                        className: (_styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4___default().round)\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\AddExpense.tsx\",\n                                        lineNumber: 69,\n                                        columnNumber: 19\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        children: category.name\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\AddExpense.tsx\",\n                                        lineNumber: 70,\n                                        columnNumber: 19\n                                    }, undefined)\n                                ]\n                            }, category.name, true, {\n                                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\AddExpense.tsx\",\n                                lineNumber: 64,\n                                columnNumber: 17\n                            }, undefined))\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\AddExpense.tsx\",\n                        lineNumber: 62,\n                        columnNumber: 13\n                    }, undefined)\n                ]\n            }, void 0, true) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4___default().amountInput),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: (_styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4___default().title),\n                        children: [\n                            \"Enter Amount for \",\n                            selectedCategory\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\AddExpense.tsx\",\n                        lineNumber: 77,\n                        columnNumber: 13\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"number\",\n                        value: amount,\n                        onChange: (e)=>setAmount(e.target.value),\n                        placeholder: \"Enter amount...\",\n                        className: (_styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4___default().input)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\AddExpense.tsx\",\n                        lineNumber: 78,\n                        columnNumber: 13\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4___default().buttons),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: (_styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4___default().cancel),\n                                onClick: ()=>setSelectedCategory(null),\n                                children: \"Back\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\AddExpense.tsx\",\n                                lineNumber: 86,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: (_styles_components_AddExpense_module_sass__WEBPACK_IMPORTED_MODULE_4___default().submit),\n                                onClick: handleSaveExpense,\n                                children: \"Save\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\AddExpense.tsx\",\n                                lineNumber: 89,\n                                columnNumber: 15\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\AddExpense.tsx\",\n                        lineNumber: 85,\n                        columnNumber: 13\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\AddExpense.tsx\",\n                lineNumber: 76,\n                columnNumber: 11\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\AddExpense.tsx\",\n            lineNumber: 58,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\AddExpense.tsx\",\n        lineNumber: 57,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddExpense);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvQWRkRXhwZW5zZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUF3QztBQUNEO0FBQ2lCO0FBQ0k7QUFFNUQscUJBQXFCO0FBQ3JCLE1BQU1NLGFBQWE7SUFDakI7UUFBRUMsTUFBTTtRQUFhQyxPQUFPO0lBQVU7SUFDdEM7UUFBRUQsTUFBTTtRQUFRQyxPQUFPO0lBQVU7SUFDakM7UUFBRUQsTUFBTTtRQUFpQkMsT0FBTztJQUFVO0lBQzFDO1FBQUVELE1BQU07UUFBVUMsT0FBTztJQUFVO0lBQ25DO1FBQUVELE1BQU07UUFBU0MsT0FBTztJQUFVO0lBQ2xDO1FBQUVELE1BQU07UUFBaUJDLE9BQU87SUFBVTtJQUMxQztRQUFFRCxNQUFNO1FBQWFDLE9BQU87SUFBVTtJQUN0QztRQUFFRCxNQUFNO1FBQVVDLE9BQU87SUFBVTtJQUNuQztRQUFFRCxNQUFNO1FBQWFDLE9BQU87SUFBVTtJQUN0QztRQUFFRCxNQUFNO1FBQVlDLE9BQU87SUFBVTtJQUNyQztRQUFFRCxNQUFNO1FBQVdDLE9BQU87SUFBVTtJQUNwQztRQUFFRCxNQUFNO1FBQVNDLE9BQU87SUFBVTtDQUNuQztBQU9ELE1BQU1DLGFBQThCLENBQUMsRUFBRUMsWUFBWSxFQUFFQyxPQUFPLEVBQUU7SUFDNUQsTUFBTSxDQUFDQyxrQkFBa0JDLG9CQUFvQixHQUFHWiwrQ0FBUUEsQ0FBZ0I7SUFDeEUsTUFBTSxDQUFDYSxRQUFRQyxVQUFVLEdBQUdkLCtDQUFRQSxDQUFDO0lBRXJDLE1BQU1lLG9CQUFvQjtRQUN4QixJQUFJLENBQUNGLFVBQVUsQ0FBQ0Ysa0JBQWtCO1FBRWxDLE1BQU1LLFdBQVdYLFdBQVdZLElBQUksQ0FBQyxDQUFDQyxJQUFNQSxFQUFFWixJQUFJLEtBQUtLO1FBQ25ELElBQUksQ0FBQ0ssVUFBVTtRQUVmLElBQUk7WUFDRixNQUFNZCwwREFBTUEsQ0FBQ0MsOERBQVVBLENBQUNGLCtDQUFFQSxFQUFFLGFBQWE7Z0JBQ3ZDZSxVQUFVTDtnQkFDVkUsUUFBUU0sV0FBV047Z0JBQ25CTixPQUFPUyxTQUFTVCxLQUFLO2dCQUNyQmEsV0FBVyxJQUFJQztZQUNqQjtZQUVBLGtCQUFrQjtZQUNsQlQsb0JBQW9CO1lBQ3BCRSxVQUFVO1lBRVYsK0NBQStDO1lBQy9DSjtRQUNGLEVBQUUsT0FBT1ksT0FBTztZQUNkQyxRQUFRRCxLQUFLLENBQUMsMEJBQTBCQTtRQUMxQztJQUNGO0lBRUEscUJBQ0UsOERBQUNFO1FBQUlDLFdBQVdyQiw0RkFBVztrQkFDekIsNEVBQUNvQjtZQUFJQyxXQUFXckIseUZBQVE7c0JBQ3JCLENBQUNPLGlDQUNBOztrQ0FDRSw4REFBQ2lCO3dCQUFFSCxXQUFXckIsd0ZBQU87a0NBQUU7Ozs7OztrQ0FDdkIsOERBQUNvQjt3QkFBSUMsV0FBV3JCLHdGQUFPO2tDQUNwQkMsV0FBVzBCLEdBQUcsQ0FBQyxDQUFDZix5QkFDZiw4REFBQ2dCO2dDQUVDUCxXQUFXckIsd0ZBQU87Z0NBQ2xCOEIsU0FBUyxJQUFNdEIsb0JBQW9CSSxTQUFTVixJQUFJOztrREFFaEQsOERBQUNrQjt3Q0FBSVcsT0FBTzs0Q0FBRUMsaUJBQWlCcEIsU0FBU1QsS0FBSzt3Q0FBQzt3Q0FBR2tCLFdBQVdyQix3RkFBTzs7Ozs7O2tEQUNuRSw4REFBQ3dCO2tEQUFHWixTQUFTVixJQUFJOzs7Ozs7OytCQUxaVSxTQUFTVixJQUFJOzs7Ozs7Ozs7Ozs2Q0FXMUIsOERBQUNrQjtnQkFBSUMsV0FBV3JCLDhGQUFhOztrQ0FDM0IsOERBQUN3Qjt3QkFBRUgsV0FBV3JCLHdGQUFPOzs0QkFBRTs0QkFBa0JPOzs7Ozs7O2tDQUN6Qyw4REFBQzRCO3dCQUNDQyxNQUFLO3dCQUNMQyxPQUFPNUI7d0JBQ1A2QixVQUFVLENBQUNDLElBQU03QixVQUFVNkIsRUFBRUMsTUFBTSxDQUFDSCxLQUFLO3dCQUN6Q0ksYUFBWTt3QkFDWnBCLFdBQVdyQix3RkFBTzs7Ozs7O2tDQUVwQiw4REFBQ29CO3dCQUFJQyxXQUFXckIsMEZBQVM7OzBDQUN2Qiw4REFBQzRCO2dDQUFPUCxXQUFXckIseUZBQVE7Z0NBQUU4QixTQUFTLElBQU10QixvQkFBb0I7MENBQU87Ozs7OzswQ0FHdkUsOERBQUNvQjtnQ0FBT1AsV0FBV3JCLHlGQUFRO2dDQUFFOEIsU0FBU25COzBDQUFtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVN2RTtBQUVBLGlFQUFlUCxVQUFVQSxFQUFDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGVtaWxlXFxEZXNrdG9wXFxhbmFseXNpc1xcYW5hbHlzaXMtbmV4dC1hcHBcXGNvbXBvbmVudHNcXEFkZEV4cGVuc2UudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBkYiB9IGZyb20gXCIuLi9maXJlYmFzZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBhZGREb2MsIGNvbGxlY3Rpb24gfSBmcm9tIFwiZmlyZWJhc2UvZmlyZXN0b3JlXCI7XHJcbmltcG9ydCBzIGZyb20gXCIuLi9zdHlsZXMvY29tcG9uZW50cy9BZGRFeHBlbnNlLm1vZHVsZS5zYXNzXCI7XHJcblxyXG4vLyDQmtCw0YLQtdCz0L7RgNC40Lgg0YDQsNGB0YXQvtC00L7QslxyXG5jb25zdCBjYXRlZ29yaWVzID0gW1xyXG4gIHsgbmFtZTogXCJUcmFuc3BvcnRcIiwgY29sb3I6IFwiI0ZGQzEwN1wiIH0sXHJcbiAgeyBuYW1lOiBcIkZvb2RcIiwgY29sb3I6IFwiI0ZGNTcyMlwiIH0sXHJcbiAgeyBuYW1lOiBcIkVudGVydGFpbm1lbnRcIiwgY29sb3I6IFwiIzlDMjdCMFwiIH0sXHJcbiAgeyBuYW1lOiBcIk91dGZpdFwiLCBjb2xvcjogXCIjMjE5NkYzXCIgfSxcclxuICB7IG5hbWU6IFwiR2lmdHNcIiwgY29sb3I6IFwiI0U5MUU2M1wiIH0sXHJcbiAgeyBuYW1lOiBcIlN1YnNjcmlwdGlvbnNcIiwgY29sb3I6IFwiIzRDQUY1MFwiIH0sXHJcbiAgeyBuYW1lOiBcIkVkdWNhdGlvblwiLCBjb2xvcjogXCIjMDNBOUY0XCIgfSxcclxuICB7IG5hbWU6IFwiSGVhbHRoXCIsIGNvbG9yOiBcIiM4QkMzNEFcIiB9LFxyXG4gIHsgbmFtZTogXCJIb3VzZWhvbGRcIiwgY29sb3I6IFwiI0ZGOTgwMFwiIH0sXHJcbiAgeyBuYW1lOiBcIlRyYW5zZmVyXCIsIGNvbG9yOiBcIiM3OTU1NDhcIiB9LFxyXG4gIHsgbmFtZTogXCJMZW5kaW5nXCIsIGNvbG9yOiBcIiM2MDdEOEJcIiB9LFxyXG4gIHsgbmFtZTogXCJPdGhlclwiLCBjb2xvcjogXCIjMDAwMDAwXCIgfSxcclxuXTtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgb25BZGRFeHBlbnNlOiAobmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7IC8vINCU0L7QsdCw0LLQuNC7INGB0Y7QtNCwIG9uQ2xvc2VcclxufTtcclxuXHJcbmNvbnN0IEFkZEV4cGVuc2U6IFJlYWN0LkZDPFByb3BzPiA9ICh7IG9uQWRkRXhwZW5zZSwgb25DbG9zZSB9KSA9PiB7XHJcbiAgY29uc3QgW3NlbGVjdGVkQ2F0ZWdvcnksIHNldFNlbGVjdGVkQ2F0ZWdvcnldID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2Ftb3VudCwgc2V0QW1vdW50XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCBoYW5kbGVTYXZlRXhwZW5zZSA9IGFzeW5jICgpID0+IHtcclxuICAgIGlmICghYW1vdW50IHx8ICFzZWxlY3RlZENhdGVnb3J5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY2F0ZWdvcnkgPSBjYXRlZ29yaWVzLmZpbmQoKGMpID0+IGMubmFtZSA9PT0gc2VsZWN0ZWRDYXRlZ29yeSk7XHJcbiAgICBpZiAoIWNhdGVnb3J5KSByZXR1cm47XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgYWRkRG9jKGNvbGxlY3Rpb24oZGIsIFwiZXhwZW5zZXNcIiksIHtcclxuICAgICAgICBjYXRlZ29yeTogc2VsZWN0ZWRDYXRlZ29yeSxcclxuICAgICAgICBhbW91bnQ6IHBhcnNlRmxvYXQoYW1vdW50KSxcclxuICAgICAgICBjb2xvcjogY2F0ZWdvcnkuY29sb3IsXHJcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vINCh0LHRgNCw0YHRi9Cy0LDQtdC8INC/0L7Qu9GPXHJcbiAgICAgIHNldFNlbGVjdGVkQ2F0ZWdvcnkobnVsbCk7XHJcbiAgICAgIHNldEFtb3VudChcIlwiKTtcclxuXHJcbiAgICAgIC8vINCX0LDQutGA0YvQstCw0LXQvCDQvNC+0LTQsNC70LrRgyDQv9C+0YHQu9C1INGD0YHQv9C10YjQvdC+0LPQviDRgdC+0YXRgNCw0L3QtdC90LjRj1xyXG4gICAgICBvbkNsb3NlKCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYWRkaW5nIGV4cGVuc2U6IFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtzLmNvbnRhaW5lcn0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLndpbmRvd30+XHJcbiAgICAgICAgeyFzZWxlY3RlZENhdGVnb3J5ID8gKFxyXG4gICAgICAgICAgPD5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzLnRpdGxlfT5BZGQgRXhwZW5zZTwvcD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MudGFibGV9PlxyXG4gICAgICAgICAgICAgIHtjYXRlZ29yaWVzLm1hcCgoY2F0ZWdvcnkpID0+IChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAga2V5PXtjYXRlZ29yeS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3MucG9pbnR9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkQ2F0ZWdvcnkoY2F0ZWdvcnkubmFtZSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBjYXRlZ29yeS5jb2xvciB9fSBjbGFzc05hbWU9e3Mucm91bmR9PjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8cD57Y2F0ZWdvcnkubmFtZX08L3A+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8Lz5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3MuYW1vdW50SW5wdXR9PlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9e3MudGl0bGV9PkVudGVyIEFtb3VudCBmb3Ige3NlbGVjdGVkQ2F0ZWdvcnl9PC9wPlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcclxuICAgICAgICAgICAgICB2YWx1ZT17YW1vdW50fVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QW1vdW50KGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIGFtb3VudC4uLlwiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzLmlucHV0fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5idXR0b25zfT5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17cy5jYW5jZWx9IG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkQ2F0ZWdvcnkobnVsbCl9PlxyXG4gICAgICAgICAgICAgICAgQmFja1xyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzLnN1Ym1pdH0gb25DbGljaz17aGFuZGxlU2F2ZUV4cGVuc2V9PlxyXG4gICAgICAgICAgICAgICAgU2F2ZVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFkZEV4cGVuc2U7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiZGIiLCJhZGREb2MiLCJjb2xsZWN0aW9uIiwicyIsImNhdGVnb3JpZXMiLCJuYW1lIiwiY29sb3IiLCJBZGRFeHBlbnNlIiwib25BZGRFeHBlbnNlIiwib25DbG9zZSIsInNlbGVjdGVkQ2F0ZWdvcnkiLCJzZXRTZWxlY3RlZENhdGVnb3J5IiwiYW1vdW50Iiwic2V0QW1vdW50IiwiaGFuZGxlU2F2ZUV4cGVuc2UiLCJjYXRlZ29yeSIsImZpbmQiLCJjIiwicGFyc2VGbG9hdCIsInRpbWVzdGFtcCIsIkRhdGUiLCJlcnJvciIsImNvbnNvbGUiLCJkaXYiLCJjbGFzc05hbWUiLCJjb250YWluZXIiLCJ3aW5kb3ciLCJwIiwidGl0bGUiLCJ0YWJsZSIsIm1hcCIsImJ1dHRvbiIsInBvaW50Iiwib25DbGljayIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwicm91bmQiLCJhbW91bnRJbnB1dCIsImlucHV0IiwidHlwZSIsInZhbHVlIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0IiwicGxhY2Vob2xkZXIiLCJidXR0b25zIiwiY2FuY2VsIiwic3VibWl0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/AddExpense.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./components/Pie/ExpenseChart.tsx":
/*!*****************************************!*\
  !*** ./components/Pie/ExpenseChart.tsx ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _firebaseConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/firebaseConfig */ \"(pages-dir-node)/./firebaseConfig.ts\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var _Pie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pie */ \"(pages-dir-node)/./components/Pie/Pie.tsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_firebaseConfig__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _Pie__WEBPACK_IMPORTED_MODULE_4__]);\n([_firebaseConfig__WEBPACK_IMPORTED_MODULE_2__, firebase_firestore__WEBPACK_IMPORTED_MODULE_3__, _Pie__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n // Убедись, что путь правильный\n\n\nconst ExpenseChart = ()=>{\n    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"ExpenseChart.useEffect\": ()=>{\n            const unsubscribe = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.onSnapshot)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.collection)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_2__.db, \"expenses\"), {\n                \"ExpenseChart.useEffect.unsubscribe\": (snapshot)=>{\n                    const expenses = [];\n                    snapshot.forEach({\n                        \"ExpenseChart.useEffect.unsubscribe\": (doc)=>{\n                            const { category, amount, color } = doc.data();\n                            const existingCategory = expenses.find({\n                                \"ExpenseChart.useEffect.unsubscribe.existingCategory\": (exp)=>exp.name === category\n                            }[\"ExpenseChart.useEffect.unsubscribe.existingCategory\"]);\n                            if (existingCategory) {\n                                existingCategory.value += amount;\n                            } else {\n                                expenses.push({\n                                    name: category,\n                                    value: amount,\n                                    color\n                                });\n                            }\n                        }\n                    }[\"ExpenseChart.useEffect.unsubscribe\"]);\n                    setData(expenses);\n                }\n            }[\"ExpenseChart.useEffect.unsubscribe\"]);\n            return ({\n                \"ExpenseChart.useEffect\": ()=>unsubscribe()\n            })[\"ExpenseChart.useEffect\"];\n        }\n    }[\"ExpenseChart.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Pie__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        data: data\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\Pie\\\\ExpenseChart.tsx\",\n        lineNumber: 36,\n        columnNumber: 10\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExpenseChart);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvUGllL0V4cGVuc2VDaGFydC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ2IsQ0FBQywrQkFBK0I7QUFDVjtBQUNsQztBQVExQixNQUFNTyxlQUF5QjtJQUM3QixNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR1AsK0NBQVFBLENBQWdCLEVBQUU7SUFFbERELGdEQUFTQTtrQ0FBQztZQUNSLE1BQU1TLGNBQWNMLDhEQUFVQSxDQUFDRCw4REFBVUEsQ0FBQ0QsK0NBQUVBLEVBQUU7c0RBQWEsQ0FBQ1E7b0JBQzFELE1BQU1DLFdBQTBCLEVBQUU7b0JBRWxDRCxTQUFTRSxPQUFPOzhEQUFDLENBQUNDOzRCQUNoQixNQUFNLEVBQUVDLFFBQVEsRUFBRUMsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBR0gsSUFBSU4sSUFBSTs0QkFDNUMsTUFBTVUsbUJBQW1CTixTQUFTTyxJQUFJO3VGQUFDLENBQUNDLE1BQVFBLElBQUlDLElBQUksS0FBS047OzRCQUU3RCxJQUFJRyxrQkFBa0I7Z0NBQ3BCQSxpQkFBaUJJLEtBQUssSUFBSU47NEJBQzVCLE9BQU87Z0NBQ0xKLFNBQVNXLElBQUksQ0FBQztvQ0FBRUYsTUFBTU47b0NBQVVPLE9BQU9OO29DQUFRQztnQ0FBTTs0QkFDdkQ7d0JBQ0Y7O29CQUVBUixRQUFRRztnQkFDVjs7WUFFQTswQ0FBTyxJQUFNRjs7UUFDZjtpQ0FBRyxFQUFFO0lBRUwscUJBQU8sOERBQUNKLDRDQUFLQTtRQUFDRSxNQUFNQTs7Ozs7O0FBQ3RCO0FBRUEsaUVBQWVELFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZW1pbGVcXERlc2t0b3BcXGFuYWx5c2lzXFxhbmFseXNpcy1uZXh0LWFwcFxcY29tcG9uZW50c1xcUGllXFxFeHBlbnNlQ2hhcnQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGRiIH0gZnJvbSBcIkAvZmlyZWJhc2VDb25maWdcIjsgLy8g0KPQsdC10LTQuNGB0YwsINGH0YLQviDQv9GD0YLRjCDQv9GA0LDQstC40LvRjNC90YvQuVxyXG5pbXBvcnQgeyBjb2xsZWN0aW9uLCBvblNuYXBzaG90IH0gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xyXG5pbXBvcnQgUGllanMgZnJvbSBcIi4vUGllXCI7XHJcblxyXG50eXBlIEV4cGVuc2VEYXRhID0ge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICB2YWx1ZTogbnVtYmVyO1xyXG4gIGNvbG9yOiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBFeHBlbnNlQ2hhcnQ6IFJlYWN0LkZDID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlPEV4cGVuc2VEYXRhW10+KFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gb25TbmFwc2hvdChjb2xsZWN0aW9uKGRiLCBcImV4cGVuc2VzXCIpLCAoc25hcHNob3QpID0+IHtcclxuICAgICAgY29uc3QgZXhwZW5zZXM6IEV4cGVuc2VEYXRhW10gPSBbXTtcclxuXHJcbiAgICAgIHNuYXBzaG90LmZvckVhY2goKGRvYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgY2F0ZWdvcnksIGFtb3VudCwgY29sb3IgfSA9IGRvYy5kYXRhKCk7XHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdDYXRlZ29yeSA9IGV4cGVuc2VzLmZpbmQoKGV4cCkgPT4gZXhwLm5hbWUgPT09IGNhdGVnb3J5KTtcclxuXHJcbiAgICAgICAgaWYgKGV4aXN0aW5nQ2F0ZWdvcnkpIHtcclxuICAgICAgICAgIGV4aXN0aW5nQ2F0ZWdvcnkudmFsdWUgKz0gYW1vdW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBleHBlbnNlcy5wdXNoKHsgbmFtZTogY2F0ZWdvcnksIHZhbHVlOiBhbW91bnQsIGNvbG9yIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZXREYXRhKGV4cGVuc2VzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB1bnN1YnNjcmliZSgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIDxQaWVqcyBkYXRhPXtkYXRhfSAvPjtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VDaGFydDtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJkYiIsImNvbGxlY3Rpb24iLCJvblNuYXBzaG90IiwiUGllanMiLCJFeHBlbnNlQ2hhcnQiLCJkYXRhIiwic2V0RGF0YSIsInVuc3Vic2NyaWJlIiwic25hcHNob3QiLCJleHBlbnNlcyIsImZvckVhY2giLCJkb2MiLCJjYXRlZ29yeSIsImFtb3VudCIsImNvbG9yIiwiZXhpc3RpbmdDYXRlZ29yeSIsImZpbmQiLCJleHAiLCJuYW1lIiwidmFsdWUiLCJwdXNoIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/Pie/ExpenseChart.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./components/Pie/Pie.tsx":
/*!********************************!*\
  !*** ./components/Pie/Pie.tsx ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Cell_Pie_PieChart_recharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=Cell,Pie,PieChart!=!recharts */ \"(pages-dir-node)/__barrel_optimize__?names=Cell,Pie,PieChart!=!./node_modules/recharts/es6/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_barrel_optimize_names_Cell_Pie_PieChart_recharts__WEBPACK_IMPORTED_MODULE_2__]);\n_barrel_optimize_names_Cell_Pie_PieChart_recharts__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nconst Piejs = ({ data })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Cell_Pie_PieChart_recharts__WEBPACK_IMPORTED_MODULE_2__.PieChart, {\n        width: 250,\n        height: 250,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Cell_Pie_PieChart_recharts__WEBPACK_IMPORTED_MODULE_2__.Pie, {\n            data: data.length > 0 ? data : [\n                {\n                    name: \"Empty\",\n                    value: 1,\n                    color: \"#D3D3D3\"\n                }\n            ],\n            cx: \"50%\",\n            cy: \"50%\",\n            innerRadius: 80,\n            outerRadius: 100,\n            paddingAngle: 5,\n            dataKey: \"value\",\n            children: data.map((entry, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Cell_Pie_PieChart_recharts__WEBPACK_IMPORTED_MODULE_2__.Cell, {\n                    fill: entry.color\n                }, `cell-${index}`, false, {\n                    fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\Pie\\\\Pie.tsx\",\n                    lineNumber: 27,\n                    columnNumber: 11\n                }, undefined))\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\Pie\\\\Pie.tsx\",\n            lineNumber: 17,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\components\\\\Pie\\\\Pie.tsx\",\n        lineNumber: 16,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Piejs);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvUGllL1BpZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNxQjtBQVkvQyxNQUFNSSxRQUF5QixDQUFDLEVBQUVDLElBQUksRUFBRTtJQUN0QyxxQkFDRSw4REFBQ0osdUZBQVFBO1FBQUNLLE9BQU87UUFBS0MsUUFBUTtrQkFDNUIsNEVBQUNMLGtGQUFHQTtZQUNGRyxNQUFNQSxLQUFLRyxNQUFNLEdBQUcsSUFBSUgsT0FBTztnQkFBQztvQkFBRUksTUFBTTtvQkFBU0MsT0FBTztvQkFBR0MsT0FBTztnQkFBVTthQUFFO1lBQzlFQyxJQUFHO1lBQ0hDLElBQUc7WUFDSEMsYUFBYTtZQUNiQyxhQUFhO1lBQ2JDLGNBQWM7WUFDZEMsU0FBUTtzQkFFUFosS0FBS2EsR0FBRyxDQUFDLENBQUNDLE9BQU9DLHNCQUNoQiw4REFBQ2pCLG1GQUFJQTtvQkFBdUJrQixNQUFNRixNQUFNUixLQUFLO21CQUFsQyxDQUFDLEtBQUssRUFBRVMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7O0FBS3BDO0FBRUEsaUVBQWVoQixLQUFLQSxFQUFDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGVtaWxlXFxEZXNrdG9wXFxhbmFseXNpc1xcYW5hbHlzaXMtbmV4dC1hcHBcXGNvbXBvbmVudHNcXFBpZVxcUGllLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFBpZUNoYXJ0LCBQaWUsIENlbGwgfSBmcm9tIFwicmVjaGFydHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZURhdGEgPSB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHZhbHVlOiBudW1iZXI7XHJcbiAgY29sb3I6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgZGF0YTogRXhwZW5zZURhdGFbXTtcclxufTtcclxuXHJcbmNvbnN0IFBpZWpzOiBSZWFjdC5GQzxQcm9wcz4gPSAoeyBkYXRhIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPFBpZUNoYXJ0IHdpZHRoPXsyNTB9IGhlaWdodD17MjUwfT5cclxuICAgICAgPFBpZVxyXG4gICAgICAgIGRhdGE9e2RhdGEubGVuZ3RoID4gMCA/IGRhdGEgOiBbeyBuYW1lOiBcIkVtcHR5XCIsIHZhbHVlOiAxLCBjb2xvcjogXCIjRDNEM0QzXCIgfV19XHJcbiAgICAgICAgY3g9XCI1MCVcIlxyXG4gICAgICAgIGN5PVwiNTAlXCJcclxuICAgICAgICBpbm5lclJhZGl1cz17ODB9XHJcbiAgICAgICAgb3V0ZXJSYWRpdXM9ezEwMH1cclxuICAgICAgICBwYWRkaW5nQW5nbGU9ezV9XHJcbiAgICAgICAgZGF0YUtleT1cInZhbHVlXCJcclxuICAgICAgPlxyXG4gICAgICAgIHtkYXRhLm1hcCgoZW50cnksIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICA8Q2VsbCBrZXk9e2BjZWxsLSR7aW5kZXh9YH0gZmlsbD17ZW50cnkuY29sb3J9IC8+XHJcbiAgICAgICAgKSl9XHJcbiAgICAgIDwvUGllPlxyXG4gICAgPC9QaWVDaGFydD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGllanM7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIlBpZUNoYXJ0IiwiUGllIiwiQ2VsbCIsIlBpZWpzIiwiZGF0YSIsIndpZHRoIiwiaGVpZ2h0IiwibGVuZ3RoIiwibmFtZSIsInZhbHVlIiwiY29sb3IiLCJjeCIsImN5IiwiaW5uZXJSYWRpdXMiLCJvdXRlclJhZGl1cyIsInBhZGRpbmdBbmdsZSIsImRhdGFLZXkiLCJtYXAiLCJlbnRyeSIsImluZGV4IiwiZmlsbCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/Pie/Pie.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./components/icons/bar-chart-2.svg":
/*!******************************************!*\
  !*** ./components/icons/bar-chart-2.svg ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _path;\nfunction _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }\n\nvar SvgBarChart2 = function SvgBarChart2(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"svg\", _extends({\n    xmlns: \"http://www.w3.org/2000/svg\",\n    width: 24,\n    height: 24,\n    fill: \"none\",\n    stroke: \"currentColor\",\n    strokeLinecap: \"round\",\n    strokeLinejoin: \"round\",\n    strokeWidth: 2,\n    className: \"bar-chart-2_svg__feather bar-chart-2_svg__feather-bar-chart-2\"\n  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"path\", {\n    d: \"M18 20V10M12 20V4M6 20v-6\"\n  })));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgBarChart2);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvaWNvbnMvYmFyLWNoYXJ0LTIuc3ZnIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0Esc0JBQXNCLHdFQUF3RSxnQkFBZ0Isc0JBQXNCLE9BQU8sc0JBQXNCLG9CQUFvQixnREFBZ0QsV0FBVztBQUNqTjtBQUMvQjtBQUNBLHNCQUFzQixnREFBbUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyx5Q0FBeUMsZ0RBQW1CO0FBQy9EO0FBQ0EsR0FBRztBQUNIO0FBQ0EsaUVBQWUsWUFBWSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxlbWlsZVxcRGVza3RvcFxcYW5hbHlzaXNcXGFuYWx5c2lzLW5leHQtYXBwXFxjb21wb25lbnRzXFxpY29uc1xcYmFyLWNoYXJ0LTIuc3ZnIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfcGF0aDtcbmZ1bmN0aW9uIF9leHRlbmRzKCkgeyByZXR1cm4gX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAobikgeyBmb3IgKHZhciBlID0gMTsgZSA8IGFyZ3VtZW50cy5sZW5ndGg7IGUrKykgeyB2YXIgdCA9IGFyZ3VtZW50c1tlXTsgZm9yICh2YXIgciBpbiB0KSAoe30pLmhhc093blByb3BlcnR5LmNhbGwodCwgcikgJiYgKG5bcl0gPSB0W3JdKTsgfSByZXR1cm4gbjsgfSwgX2V4dGVuZHMuYXBwbHkobnVsbCwgYXJndW1lbnRzKTsgfVxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG52YXIgU3ZnQmFyQ2hhcnQyID0gZnVuY3Rpb24gU3ZnQmFyQ2hhcnQyKHByb3BzKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCBfZXh0ZW5kcyh7XG4gICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICB3aWR0aDogMjQsXG4gICAgaGVpZ2h0OiAyNCxcbiAgICBmaWxsOiBcIm5vbmVcIixcbiAgICBzdHJva2U6IFwiY3VycmVudENvbG9yXCIsXG4gICAgc3Ryb2tlTGluZWNhcDogXCJyb3VuZFwiLFxuICAgIHN0cm9rZUxpbmVqb2luOiBcInJvdW5kXCIsXG4gICAgc3Ryb2tlV2lkdGg6IDIsXG4gICAgY2xhc3NOYW1lOiBcImJhci1jaGFydC0yX3N2Z19fZmVhdGhlciBiYXItY2hhcnQtMl9zdmdfX2ZlYXRoZXItYmFyLWNoYXJ0LTJcIlxuICB9LCBwcm9wcyksIF9wYXRoIHx8IChfcGF0aCA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7XG4gICAgZDogXCJNMTggMjBWMTBNMTIgMjBWNE02IDIwdi02XCJcbiAgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTdmdCYXJDaGFydDI7Il0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/icons/bar-chart-2.svg\n");

/***/ }),

/***/ "(pages-dir-node)/./components/icons/clocklight.svg":
/*!*****************************************!*\
  !*** ./components/icons/clocklight.svg ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _path, _path2;\nfunction _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }\n\nvar SvgClocklight = function SvgClocklight(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"svg\", _extends({\n    xmlns: \"http://www.w3.org/2000/svg\",\n    width: 24,\n    height: 24,\n    fill: \"none\"\n  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"path\", {\n    stroke: \"#fff\",\n    strokeLinecap: \"round\",\n    strokeLinejoin: \"round\",\n    strokeWidth: 2,\n    d: \"M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10\"\n  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"path\", {\n    stroke: \"#fff\",\n    strokeLinecap: \"round\",\n    strokeLinejoin: \"round\",\n    strokeWidth: 2,\n    d: \"M12 6v6l4 2\"\n  })));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgClocklight);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvaWNvbnMvY2xvY2tsaWdodC5zdmciLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQSxzQkFBc0Isd0VBQXdFLGdCQUFnQixzQkFBc0IsT0FBTyxzQkFBc0Isb0JBQW9CLGdEQUFnRCxXQUFXO0FBQ2pOO0FBQy9CO0FBQ0Esc0JBQXNCLGdEQUFtQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcseUNBQXlDLGdEQUFtQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxxQ0FBcUMsZ0RBQW1CO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxpRUFBZSxhQUFhIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGVtaWxlXFxEZXNrdG9wXFxhbmFseXNpc1xcYW5hbHlzaXMtbmV4dC1hcHBcXGNvbXBvbmVudHNcXGljb25zXFxjbG9ja2xpZ2h0LnN2ZyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3BhdGgsIF9wYXRoMjtcbmZ1bmN0aW9uIF9leHRlbmRzKCkgeyByZXR1cm4gX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAobikgeyBmb3IgKHZhciBlID0gMTsgZSA8IGFyZ3VtZW50cy5sZW5ndGg7IGUrKykgeyB2YXIgdCA9IGFyZ3VtZW50c1tlXTsgZm9yICh2YXIgciBpbiB0KSAoe30pLmhhc093blByb3BlcnR5LmNhbGwodCwgcikgJiYgKG5bcl0gPSB0W3JdKTsgfSByZXR1cm4gbjsgfSwgX2V4dGVuZHMuYXBwbHkobnVsbCwgYXJndW1lbnRzKTsgfVxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG52YXIgU3ZnQ2xvY2tsaWdodCA9IGZ1bmN0aW9uIFN2Z0Nsb2NrbGlnaHQocHJvcHMpIHtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIF9leHRlbmRzKHtcbiAgICB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFxuICAgIHdpZHRoOiAyNCxcbiAgICBoZWlnaHQ6IDI0LFxuICAgIGZpbGw6IFwibm9uZVwiXG4gIH0sIHByb3BzKSwgX3BhdGggfHwgKF9wYXRoID0gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHtcbiAgICBzdHJva2U6IFwiI2ZmZlwiLFxuICAgIHN0cm9rZUxpbmVjYXA6IFwicm91bmRcIixcbiAgICBzdHJva2VMaW5lam9pbjogXCJyb3VuZFwiLFxuICAgIHN0cm9rZVdpZHRoOiAyLFxuICAgIGQ6IFwiTTEyIDIyYzUuNTIzIDAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTBcIlxuICB9KSksIF9wYXRoMiB8fCAoX3BhdGgyID0gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHtcbiAgICBzdHJva2U6IFwiI2ZmZlwiLFxuICAgIHN0cm9rZUxpbmVjYXA6IFwicm91bmRcIixcbiAgICBzdHJva2VMaW5lam9pbjogXCJyb3VuZFwiLFxuICAgIHN0cm9rZVdpZHRoOiAyLFxuICAgIGQ6IFwiTTEyIDZ2Nmw0IDJcIlxuICB9KSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFN2Z0Nsb2NrbGlnaHQ7Il0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/icons/clocklight.svg\n");

/***/ }),

/***/ "(pages-dir-node)/./components/icons/langchoose.svg":
/*!*****************************************!*\
  !*** ./components/icons/langchoose.svg ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _path;\nfunction _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }\n\nvar SvgLangchoose = function SvgLangchoose(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"svg\", _extends({\n    xmlns: \"http://www.w3.org/2000/svg\",\n    width: 10,\n    height: 6,\n    fill: \"none\"\n  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"path\", {\n    fill: \"#1C1C3B\",\n    d: \"m8.82.5.555.493L5 5.5.625.993 1.179.5 5 4.436z\"\n  })));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgLangchoose);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvaWNvbnMvbGFuZ2Nob29zZS5zdmciLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQSxzQkFBc0Isd0VBQXdFLGdCQUFnQixzQkFBc0IsT0FBTyxzQkFBc0Isb0JBQW9CLGdEQUFnRCxXQUFXO0FBQ2pOO0FBQy9CO0FBQ0Esc0JBQXNCLGdEQUFtQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcseUNBQXlDLGdEQUFtQjtBQUMvRDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsaUVBQWUsYUFBYSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxlbWlsZVxcRGVza3RvcFxcYW5hbHlzaXNcXGFuYWx5c2lzLW5leHQtYXBwXFxjb21wb25lbnRzXFxpY29uc1xcbGFuZ2Nob29zZS5zdmciXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9wYXRoO1xuZnVuY3Rpb24gX2V4dGVuZHMoKSB7IHJldHVybiBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uIChuKSB7IGZvciAodmFyIGUgPSAxOyBlIDwgYXJndW1lbnRzLmxlbmd0aDsgZSsrKSB7IHZhciB0ID0gYXJndW1lbnRzW2VdOyBmb3IgKHZhciByIGluIHQpICh7fSkuaGFzT3duUHJvcGVydHkuY2FsbCh0LCByKSAmJiAobltyXSA9IHRbcl0pOyB9IHJldHVybiBuOyB9LCBfZXh0ZW5kcy5hcHBseShudWxsLCBhcmd1bWVudHMpOyB9XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbnZhciBTdmdMYW5nY2hvb3NlID0gZnVuY3Rpb24gU3ZnTGFuZ2Nob29zZShwcm9wcykge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgX2V4dGVuZHMoe1xuICAgIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgd2lkdGg6IDEwLFxuICAgIGhlaWdodDogNixcbiAgICBmaWxsOiBcIm5vbmVcIlxuICB9LCBwcm9wcyksIF9wYXRoIHx8IChfcGF0aCA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7XG4gICAgZmlsbDogXCIjMUMxQzNCXCIsXG4gICAgZDogXCJtOC44Mi41LjU1NS40OTNMNSA1LjUuNjI1Ljk5MyAxLjE3OS41IDUgNC40MzZ6XCJcbiAgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTdmdMYW5nY2hvb3NlOyJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/icons/langchoose.svg\n");

/***/ }),

/***/ "(pages-dir-node)/./components/icons/minus.svg":
/*!************************************!*\
  !*** ./components/icons/minus.svg ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _path;\nfunction _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }\n\nvar SvgMinus = function SvgMinus(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"svg\", _extends({\n    xmlns: \"http://www.w3.org/2000/svg\",\n    width: 24,\n    height: 24,\n    fill: \"none\",\n    stroke: \"currentColor\",\n    strokeLinecap: \"round\",\n    strokeLinejoin: \"round\",\n    strokeWidth: 2,\n    className: \"minus_svg__feather minus_svg__feather-minus\"\n  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"path\", {\n    d: \"M5 12h14\"\n  })));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgMinus);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvaWNvbnMvbWludXMuc3ZnIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0Esc0JBQXNCLHdFQUF3RSxnQkFBZ0Isc0JBQXNCLE9BQU8sc0JBQXNCLG9CQUFvQixnREFBZ0QsV0FBVztBQUNqTjtBQUMvQjtBQUNBLHNCQUFzQixnREFBbUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyx5Q0FBeUMsZ0RBQW1CO0FBQy9EO0FBQ0EsR0FBRztBQUNIO0FBQ0EsaUVBQWUsUUFBUSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxlbWlsZVxcRGVza3RvcFxcYW5hbHlzaXNcXGFuYWx5c2lzLW5leHQtYXBwXFxjb21wb25lbnRzXFxpY29uc1xcbWludXMuc3ZnIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfcGF0aDtcbmZ1bmN0aW9uIF9leHRlbmRzKCkgeyByZXR1cm4gX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAobikgeyBmb3IgKHZhciBlID0gMTsgZSA8IGFyZ3VtZW50cy5sZW5ndGg7IGUrKykgeyB2YXIgdCA9IGFyZ3VtZW50c1tlXTsgZm9yICh2YXIgciBpbiB0KSAoe30pLmhhc093blByb3BlcnR5LmNhbGwodCwgcikgJiYgKG5bcl0gPSB0W3JdKTsgfSByZXR1cm4gbjsgfSwgX2V4dGVuZHMuYXBwbHkobnVsbCwgYXJndW1lbnRzKTsgfVxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG52YXIgU3ZnTWludXMgPSBmdW5jdGlvbiBTdmdNaW51cyhwcm9wcykge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgX2V4dGVuZHMoe1xuICAgIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgd2lkdGg6IDI0LFxuICAgIGhlaWdodDogMjQsXG4gICAgZmlsbDogXCJub25lXCIsXG4gICAgc3Ryb2tlOiBcImN1cnJlbnRDb2xvclwiLFxuICAgIHN0cm9rZUxpbmVjYXA6IFwicm91bmRcIixcbiAgICBzdHJva2VMaW5lam9pbjogXCJyb3VuZFwiLFxuICAgIHN0cm9rZVdpZHRoOiAyLFxuICAgIGNsYXNzTmFtZTogXCJtaW51c19zdmdfX2ZlYXRoZXIgbWludXNfc3ZnX19mZWF0aGVyLW1pbnVzXCJcbiAgfSwgcHJvcHMpLCBfcGF0aCB8fCAoX3BhdGggPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICAgIGQ6IFwiTTUgMTJoMTRcIlxuICB9KSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFN2Z01pbnVzOyJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/icons/minus.svg\n");

/***/ }),

/***/ "(pages-dir-node)/./components/icons/moonlight.svg":
/*!****************************************!*\
  !*** ./components/icons/moonlight.svg ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _g, _defs;\nfunction _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }\n\nvar SvgMoonlight = function SvgMoonlight(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"svg\", _extends({\n    xmlns: \"http://www.w3.org/2000/svg\",\n    width: 24,\n    height: 24,\n    fill: \"none\"\n  }, props), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"g\", {\n    clipPath: \"url(#moonlight_svg__a)\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"path\", {\n    fill: \"#fff\",\n    d: \"M12.645 23.78q-1.015 0-2.016-.164A12.466 12.466 0 0 1 .343 9.312 12.38 12.38 0 0 1 6.576.432a1.66 1.66 0 0 1 1.79.11 1.64 1.64 0 0 1 .685 1.652l-.891-.068.843.15A10.74 10.74 0 0 0 16.005 14.4c1.866.648 3.875.774 5.808.363a1.674 1.674 0 0 1 1.824 2.38 12.47 12.47 0 0 1-10.992 6.638M7.317 1.983a10.745 10.745 0 0 0-3.429 15.613 10.738 10.738 0 0 0 18.178-1.138c-2.205.444-4.49.292-6.617-.439A12.466 12.466 0 0 1 7.317 1.982\"\n  }))), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"defs\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"clipPath\", {\n    id: \"moonlight_svg__a\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"path\", {\n    fill: \"#fff\",\n    d: \"M0 0h24v24H0z\"\n  })))));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgMoonlight);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvaWNvbnMvbW9vbmxpZ2h0LnN2ZyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBLHNCQUFzQix3RUFBd0UsZ0JBQWdCLHNCQUFzQixPQUFPLHNCQUFzQixvQkFBb0IsZ0RBQWdELFdBQVc7QUFDak47QUFDL0I7QUFDQSxzQkFBc0IsZ0RBQW1CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxtQ0FBbUMsZ0RBQW1CO0FBQ3pEO0FBQ0EsR0FBRyxlQUFlLGdEQUFtQjtBQUNyQztBQUNBO0FBQ0EsR0FBRyxvQ0FBb0MsZ0RBQW1CLDRCQUE0QixnREFBbUI7QUFDekc7QUFDQSxHQUFHLGVBQWUsZ0RBQW1CO0FBQ3JDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxpRUFBZSxZQUFZIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGVtaWxlXFxEZXNrdG9wXFxhbmFseXNpc1xcYW5hbHlzaXMtbmV4dC1hcHBcXGNvbXBvbmVudHNcXGljb25zXFxtb29ubGlnaHQuc3ZnIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfZywgX2RlZnM7XG5mdW5jdGlvbiBfZXh0ZW5kcygpIHsgcmV0dXJuIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24uYmluZCgpIDogZnVuY3Rpb24gKG4pIHsgZm9yICh2YXIgZSA9IDE7IGUgPCBhcmd1bWVudHMubGVuZ3RoOyBlKyspIHsgdmFyIHQgPSBhcmd1bWVudHNbZV07IGZvciAodmFyIHIgaW4gdCkgKHt9KS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsIHIpICYmIChuW3JdID0gdFtyXSk7IH0gcmV0dXJuIG47IH0sIF9leHRlbmRzLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7IH1cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xudmFyIFN2Z01vb25saWdodCA9IGZ1bmN0aW9uIFN2Z01vb25saWdodChwcm9wcykge1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgX2V4dGVuZHMoe1xuICAgIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gICAgd2lkdGg6IDI0LFxuICAgIGhlaWdodDogMjQsXG4gICAgZmlsbDogXCJub25lXCJcbiAgfSwgcHJvcHMpLCBfZyB8fCAoX2cgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImdcIiwge1xuICAgIGNsaXBQYXRoOiBcInVybCgjbW9vbmxpZ2h0X3N2Z19fYSlcIlxuICB9LCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1xuICAgIGZpbGw6IFwiI2ZmZlwiLFxuICAgIGQ6IFwiTTEyLjY0NSAyMy43OHEtMS4wMTUgMC0yLjAxNi0uMTY0QTEyLjQ2NiAxMi40NjYgMCAwIDEgLjM0MyA5LjMxMiAxMi4zOCAxMi4zOCAwIDAgMSA2LjU3Ni40MzJhMS42NiAxLjY2IDAgMCAxIDEuNzkuMTEgMS42NCAxLjY0IDAgMCAxIC42ODUgMS42NTJsLS44OTEtLjA2OC44NDMuMTVBMTAuNzQgMTAuNzQgMCAwIDAgMTYuMDA1IDE0LjRjMS44NjYuNjQ4IDMuODc1Ljc3NCA1LjgwOC4zNjNhMS42NzQgMS42NzQgMCAwIDEgMS44MjQgMi4zOCAxMi40NyAxMi40NyAwIDAgMS0xMC45OTIgNi42MzhNNy4zMTcgMS45ODNhMTAuNzQ1IDEwLjc0NSAwIDAgMC0zLjQyOSAxNS42MTMgMTAuNzM4IDEwLjczOCAwIDAgMCAxOC4xNzgtMS4xMzhjLTIuMjA1LjQ0NC00LjQ5LjI5Mi02LjYxNy0uNDM5QTEyLjQ2NiAxMi40NjYgMCAwIDEgNy4zMTcgMS45ODJcIlxuICB9KSkpLCBfZGVmcyB8fCAoX2RlZnMgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImRlZnNcIiwgbnVsbCwgLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjbGlwUGF0aFwiLCB7XG4gICAgaWQ6IFwibW9vbmxpZ2h0X3N2Z19fYVwiXG4gIH0sIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7XG4gICAgZmlsbDogXCIjZmZmXCIsXG4gICAgZDogXCJNMCAwaDI0djI0SDB6XCJcbiAgfSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFN2Z01vb25saWdodDsiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/icons/moonlight.svg\n");

/***/ }),

/***/ "(pages-dir-node)/./components/icons/notifications.svg":
/*!********************************************!*\
  !*** ./components/icons/notifications.svg ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _path;\nfunction _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }\n\nvar SvgNotifications = function SvgNotifications(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"svg\", _extends({\n    xmlns: \"http://www.w3.org/2000/svg\",\n    width: 18,\n    height: 21,\n    fill: \"none\"\n  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"path\", {\n    fill: \"#000\",\n    d: \"M9 0c-.248 0-.494.05-.72.15a1.75 1.75 0 0 0-.592.421c-.165.18-.287.391-.36.62s-.096.47-.065.708A7.03 7.03 0 0 0 3.47 4.304 6.6 6.6 0 0 0 2 8.448v6.759H1c-.265 0-.52.102-.707.283a.95.95 0 0 0-.293.682c0 .256.105.502.293.683.187.181.442.283.707.283h16c.265 0 .52-.102.707-.283a.95.95 0 0 0 .293-.683.95.95 0 0 0-.293-.682 1.02 1.02 0 0 0-.707-.283h-1V8.448c0-1.5-.517-2.959-1.47-4.144a7.03 7.03 0 0 0-3.793-2.405c.03-.238.009-.479-.064-.708a1.7 1.7 0 0 0-.36-.62A1.75 1.75 0 0 0 9.72.15 1.8 1.8 0 0 0 9 0m0 21a3.06 3.06 0 0 1-2.121-.848A2.85 2.85 0 0 1 6 18.103h6c0 .769-.316 1.505-.879 2.049A3.06 3.06 0 0 1 9 21\"\n  })));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgNotifications);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvaWNvbnMvbm90aWZpY2F0aW9ucy5zdmciLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQSxzQkFBc0Isd0VBQXdFLGdCQUFnQixzQkFBc0IsT0FBTyxzQkFBc0Isb0JBQW9CLGdEQUFnRCxXQUFXO0FBQ2pOO0FBQy9CO0FBQ0Esc0JBQXNCLGdEQUFtQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcseUNBQXlDLGdEQUFtQjtBQUMvRDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsaUVBQWUsZ0JBQWdCIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGVtaWxlXFxEZXNrdG9wXFxhbmFseXNpc1xcYW5hbHlzaXMtbmV4dC1hcHBcXGNvbXBvbmVudHNcXGljb25zXFxub3RpZmljYXRpb25zLnN2ZyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3BhdGg7XG5mdW5jdGlvbiBfZXh0ZW5kcygpIHsgcmV0dXJuIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24uYmluZCgpIDogZnVuY3Rpb24gKG4pIHsgZm9yICh2YXIgZSA9IDE7IGUgPCBhcmd1bWVudHMubGVuZ3RoOyBlKyspIHsgdmFyIHQgPSBhcmd1bWVudHNbZV07IGZvciAodmFyIHIgaW4gdCkgKHt9KS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsIHIpICYmIChuW3JdID0gdFtyXSk7IH0gcmV0dXJuIG47IH0sIF9leHRlbmRzLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7IH1cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xudmFyIFN2Z05vdGlmaWNhdGlvbnMgPSBmdW5jdGlvbiBTdmdOb3RpZmljYXRpb25zKHByb3BzKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCBfZXh0ZW5kcyh7XG4gICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICB3aWR0aDogMTgsXG4gICAgaGVpZ2h0OiAyMSxcbiAgICBmaWxsOiBcIm5vbmVcIlxuICB9LCBwcm9wcyksIF9wYXRoIHx8IChfcGF0aCA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7XG4gICAgZmlsbDogXCIjMDAwXCIsXG4gICAgZDogXCJNOSAwYy0uMjQ4IDAtLjQ5NC4wNS0uNzIuMTVhMS43NSAxLjc1IDAgMCAwLS41OTIuNDIxYy0uMTY1LjE4LS4yODcuMzkxLS4zNi42MnMtLjA5Ni40Ny0uMDY1LjcwOEE3LjAzIDcuMDMgMCAwIDAgMy40NyA0LjMwNCA2LjYgNi42IDAgMCAwIDIgOC40NDh2Ni43NTlIMWMtLjI2NSAwLS41Mi4xMDItLjcwNy4yODNhLjk1Ljk1IDAgMCAwLS4yOTMuNjgyYzAgLjI1Ni4xMDUuNTAyLjI5My42ODMuMTg3LjE4MS40NDIuMjgzLjcwNy4yODNoMTZjLjI2NSAwIC41Mi0uMTAyLjcwNy0uMjgzYS45NS45NSAwIDAgMCAuMjkzLS42ODMuOTUuOTUgMCAwIDAtLjI5My0uNjgyIDEuMDIgMS4wMiAwIDAgMC0uNzA3LS4yODNoLTFWOC40NDhjMC0xLjUtLjUxNy0yLjk1OS0xLjQ3LTQuMTQ0YTcuMDMgNy4wMyAwIDAgMC0zLjc5My0yLjQwNWMuMDMtLjIzOC4wMDktLjQ3OS0uMDY0LS43MDhhMS43IDEuNyAwIDAgMC0uMzYtLjYyQTEuNzUgMS43NSAwIDAgMCA5LjcyLjE1IDEuOCAxLjggMCAwIDAgOSAwbTAgMjFhMy4wNiAzLjA2IDAgMCAxLTIuMTIxLS44NDhBMi44NSAyLjg1IDAgMCAxIDYgMTguMTAzaDZjMCAuNzY5LS4zMTYgMS41MDUtLjg3OSAyLjA0OUEzLjA2IDMuMDYgMCAwIDEgOSAyMVwiXG4gIH0pKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU3ZnTm90aWZpY2F0aW9uczsiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/icons/notifications.svg\n");

/***/ }),

/***/ "(pages-dir-node)/./components/icons/plus.svg":
/*!***********************************!*\
  !*** ./components/icons/plus.svg ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _path;\nfunction _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }\n\nvar SvgPlus = function SvgPlus(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"svg\", _extends({\n    xmlns: \"http://www.w3.org/2000/svg\",\n    width: 24,\n    height: 24,\n    fill: \"none\",\n    stroke: \"currentColor\",\n    strokeLinecap: \"round\",\n    strokeLinejoin: \"round\",\n    strokeWidth: 2,\n    className: \"plus_svg__feather plus_svg__feather-plus\"\n  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"path\", {\n    d: \"M12 5v14M5 12h14\"\n  })));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgPlus);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvaWNvbnMvcGx1cy5zdmciLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQSxzQkFBc0Isd0VBQXdFLGdCQUFnQixzQkFBc0IsT0FBTyxzQkFBc0Isb0JBQW9CLGdEQUFnRCxXQUFXO0FBQ2pOO0FBQy9CO0FBQ0Esc0JBQXNCLGdEQUFtQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLHlDQUF5QyxnREFBbUI7QUFDL0Q7QUFDQSxHQUFHO0FBQ0g7QUFDQSxpRUFBZSxPQUFPIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGVtaWxlXFxEZXNrdG9wXFxhbmFseXNpc1xcYW5hbHlzaXMtbmV4dC1hcHBcXGNvbXBvbmVudHNcXGljb25zXFxwbHVzLnN2ZyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3BhdGg7XG5mdW5jdGlvbiBfZXh0ZW5kcygpIHsgcmV0dXJuIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24uYmluZCgpIDogZnVuY3Rpb24gKG4pIHsgZm9yICh2YXIgZSA9IDE7IGUgPCBhcmd1bWVudHMubGVuZ3RoOyBlKyspIHsgdmFyIHQgPSBhcmd1bWVudHNbZV07IGZvciAodmFyIHIgaW4gdCkgKHt9KS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsIHIpICYmIChuW3JdID0gdFtyXSk7IH0gcmV0dXJuIG47IH0sIF9leHRlbmRzLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7IH1cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xudmFyIFN2Z1BsdXMgPSBmdW5jdGlvbiBTdmdQbHVzKHByb3BzKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCBfZXh0ZW5kcyh7XG4gICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgICB3aWR0aDogMjQsXG4gICAgaGVpZ2h0OiAyNCxcbiAgICBmaWxsOiBcIm5vbmVcIixcbiAgICBzdHJva2U6IFwiY3VycmVudENvbG9yXCIsXG4gICAgc3Ryb2tlTGluZWNhcDogXCJyb3VuZFwiLFxuICAgIHN0cm9rZUxpbmVqb2luOiBcInJvdW5kXCIsXG4gICAgc3Ryb2tlV2lkdGg6IDIsXG4gICAgY2xhc3NOYW1lOiBcInBsdXNfc3ZnX19mZWF0aGVyIHBsdXNfc3ZnX19mZWF0aGVyLXBsdXNcIlxuICB9LCBwcm9wcyksIF9wYXRoIHx8IChfcGF0aCA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwicGF0aFwiLCB7XG4gICAgZDogXCJNMTIgNXYxNE01IDEyaDE0XCJcbiAgfSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTdmdQbHVzOyJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/icons/plus.svg\n");

/***/ }),

/***/ "(pages-dir-node)/./firebaseConfig.ts":
/*!***************************!*\
  !*** ./firebaseConfig.ts ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__]);\n([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\nconst firebaseConfig = {\n    apiKey: \"AIzaSyB1Cd-098xJgz6FvYHNaKRXsQwlU41XtjE\",\n    authDomain: \"smartspend-7dfdc.firebaseapp.com\",\n    projectId: \"smartspend-7dfdc\",\n    storageBucket: \"smartspend-7dfdc.appspot.com\",\n    messagingSenderId: \"1034968117344\",\n    appId: \"1:1034968117344:web:2757c8dc08bb413daf1305\",\n    measurementId: \"G-KHCRDF2E9K\"\n};\n// Инициализация Firebase\nconst app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\n// Экспорт Firestore (вместо Realtime Database)\nconst db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(app);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2ZpcmViYXNlQ29uZmlnLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUE2QztBQUNLO0FBRWxELE1BQU1FLGlCQUFpQjtJQUNyQkMsUUFBUTtJQUNSQyxZQUFZO0lBQ1pDLFdBQVc7SUFDWEMsZUFBZTtJQUNmQyxtQkFBbUI7SUFDbkJDLE9BQU87SUFDUEMsZUFBZTtBQUNqQjtBQUVBLHlCQUF5QjtBQUN6QixNQUFNQyxNQUFNViwyREFBYUEsQ0FBQ0U7QUFFMUIsK0NBQStDO0FBQ3hDLE1BQU1TLEtBQUtWLGdFQUFZQSxDQUFDUyxLQUFLIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGVtaWxlXFxEZXNrdG9wXFxhbmFseXNpc1xcYW5hbHlzaXMtbmV4dC1hcHBcXGZpcmViYXNlQ29uZmlnLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluaXRpYWxpemVBcHAgfSBmcm9tIFwiZmlyZWJhc2UvYXBwXCI7XHJcbmltcG9ydCB7IGdldEZpcmVzdG9yZSB9IGZyb20gXCJmaXJlYmFzZS9maXJlc3RvcmVcIjtcclxuXHJcbmNvbnN0IGZpcmViYXNlQ29uZmlnID0ge1xyXG4gIGFwaUtleTogXCJBSXphU3lCMUNkLTA5OHhKZ3o2RnZZSE5hS1JYc1F3bFU0MVh0akVcIixcclxuICBhdXRoRG9tYWluOiBcInNtYXJ0c3BlbmQtN2RmZGMuZmlyZWJhc2VhcHAuY29tXCIsXHJcbiAgcHJvamVjdElkOiBcInNtYXJ0c3BlbmQtN2RmZGNcIixcclxuICBzdG9yYWdlQnVja2V0OiBcInNtYXJ0c3BlbmQtN2RmZGMuYXBwc3BvdC5jb21cIixcclxuICBtZXNzYWdpbmdTZW5kZXJJZDogXCIxMDM0OTY4MTE3MzQ0XCIsXHJcbiAgYXBwSWQ6IFwiMToxMDM0OTY4MTE3MzQ0OndlYjoyNzU3YzhkYzA4YmI0MTNkYWYxMzA1XCIsXHJcbiAgbWVhc3VyZW1lbnRJZDogXCJHLUtIQ1JERjJFOUtcIlxyXG59O1xyXG5cclxuLy8g0JjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8gRmlyZWJhc2VcclxuY29uc3QgYXBwID0gaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XHJcblxyXG4vLyDQrdC60YHQv9C+0YDRgiBGaXJlc3RvcmUgKNCy0LzQtdGB0YLQviBSZWFsdGltZSBEYXRhYmFzZSlcclxuZXhwb3J0IGNvbnN0IGRiID0gZ2V0RmlyZXN0b3JlKGFwcCk7Il0sIm5hbWVzIjpbImluaXRpYWxpemVBcHAiLCJnZXRGaXJlc3RvcmUiLCJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsImF1dGhEb21haW4iLCJwcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJhcHBJZCIsIm1lYXN1cmVtZW50SWQiLCJhcHAiLCJkYiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./firebaseConfig.ts\n");

/***/ }),

/***/ "(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F&preferredRegion=&absolutePagePath=.%2Fpages%5Cindex.tsx&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F&preferredRegion=&absolutePagePath=.%2Fpages%5Cindex.tsx&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getServerSideProps: () => (/* binding */ getServerSideProps),\n/* harmony export */   getStaticPaths: () => (/* binding */ getStaticPaths),\n/* harmony export */   getStaticProps: () => (/* binding */ getStaticProps),\n/* harmony export */   reportWebVitals: () => (/* binding */ reportWebVitals),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   unstable_getServerProps: () => (/* binding */ unstable_getServerProps),\n/* harmony export */   unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),\n/* harmony export */   unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),\n/* harmony export */   unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),\n/* harmony export */   unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/pages/module.compiled */ \"(pages-dir-node)/./node_modules/next/dist/server/route-modules/pages/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(pages-dir-node)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(pages-dir-node)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! private-next-pages/_document */ \"(pages-dir-node)/./node_modules/next/dist/pages/_document.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! private-next-pages/_app */ \"(pages-dir-node)/./pages/_app.tsx\");\n/* harmony import */ var _pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages\\index.tsx */ \"(pages-dir-node)/./pages/index.tsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__]);\n_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n// Import the app and document modules.\n\n\n// Import the userland code.\n\n// Re-export the component (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'default'));\n// Re-export methods.\nconst getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'getStaticProps');\nconst getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'getStaticPaths');\nconst getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'getServerSideProps');\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'config');\nconst reportWebVitals = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'reportWebVitals');\n// Re-export legacy methods.\nconst unstable_getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticProps');\nconst unstable_getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticPaths');\nconst unstable_getStaticParams = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticParams');\nconst unstable_getServerProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerProps');\nconst unstable_getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerSideProps');\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES,\n        page: \"/index\",\n        pathname: \"/\",\n        // The following aren't used in production.\n        bundlePath: '',\n        filename: ''\n    },\n    components: {\n        // default export might not exist when optimized for data only\n        App: private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n        Document: (private_next_pages_document__WEBPACK_IMPORTED_MODULE_3___default())\n    },\n    userland: _pages_index_tsx__WEBPACK_IMPORTED_MODULE_5__\n});\n\n//# sourceMappingURL=pages.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtcm91dGUtbG9hZGVyL2luZGV4LmpzP2tpbmQ9UEFHRVMmcGFnZT0lMkYmcHJlZmVycmVkUmVnaW9uPSZhYnNvbHV0ZVBhZ2VQYXRoPS4lMkZwYWdlcyU1Q2luZGV4LnRzeCZhYnNvbHV0ZUFwcFBhdGg9cHJpdmF0ZS1uZXh0LXBhZ2VzJTJGX2FwcCZhYnNvbHV0ZURvY3VtZW50UGF0aD1wcml2YXRlLW5leHQtcGFnZXMlMkZfZG9jdW1lbnQmbWlkZGxld2FyZUNvbmZpZ0Jhc2U2ND1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdGO0FBQ2hDO0FBQ0U7QUFDMUQ7QUFDeUQ7QUFDVjtBQUMvQztBQUMrQztBQUMvQztBQUNBLGlFQUFlLHdFQUFLLENBQUMsNkNBQVEsWUFBWSxFQUFDO0FBQzFDO0FBQ08sdUJBQXVCLHdFQUFLLENBQUMsNkNBQVE7QUFDckMsdUJBQXVCLHdFQUFLLENBQUMsNkNBQVE7QUFDckMsMkJBQTJCLHdFQUFLLENBQUMsNkNBQVE7QUFDekMsZUFBZSx3RUFBSyxDQUFDLDZDQUFRO0FBQzdCLHdCQUF3Qix3RUFBSyxDQUFDLDZDQUFRO0FBQzdDO0FBQ08sZ0NBQWdDLHdFQUFLLENBQUMsNkNBQVE7QUFDOUMsZ0NBQWdDLHdFQUFLLENBQUMsNkNBQVE7QUFDOUMsaUNBQWlDLHdFQUFLLENBQUMsNkNBQVE7QUFDL0MsZ0NBQWdDLHdFQUFLLENBQUMsNkNBQVE7QUFDOUMsb0NBQW9DLHdFQUFLLENBQUMsNkNBQVE7QUFDekQ7QUFDTyx3QkFBd0Isa0dBQWdCO0FBQy9DO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhLDhEQUFXO0FBQ3hCLGtCQUFrQixvRUFBZ0I7QUFDbEMsS0FBSztBQUNMLFlBQVk7QUFDWixDQUFDOztBQUVELGlDIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnZXNSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvcGFnZXMvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvdGVtcGxhdGVzL2hlbHBlcnNcIjtcbi8vIEltcG9ydCB0aGUgYXBwIGFuZCBkb2N1bWVudCBtb2R1bGVzLlxuaW1wb3J0ICogYXMgZG9jdW1lbnQgZnJvbSBcInByaXZhdGUtbmV4dC1wYWdlcy9fZG9jdW1lbnRcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwicHJpdmF0ZS1uZXh0LXBhZ2VzL19hcHBcIjtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIuL3BhZ2VzXFxcXGluZGV4LnRzeFwiO1xuLy8gUmUtZXhwb3J0IHRoZSBjb21wb25lbnQgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsICdkZWZhdWx0Jyk7XG4vLyBSZS1leHBvcnQgbWV0aG9kcy5cbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAnZ2V0U3RhdGljUHJvcHMnKTtcbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQYXRocyA9IGhvaXN0KHVzZXJsYW5kLCAnZ2V0U3RhdGljUGF0aHMnKTtcbmV4cG9ydCBjb25zdCBnZXRTZXJ2ZXJTaWRlUHJvcHMgPSBob2lzdCh1c2VybGFuZCwgJ2dldFNlcnZlclNpZGVQcm9wcycpO1xuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGhvaXN0KHVzZXJsYW5kLCAnY29uZmlnJyk7XG5leHBvcnQgY29uc3QgcmVwb3J0V2ViVml0YWxzID0gaG9pc3QodXNlcmxhbmQsICdyZXBvcnRXZWJWaXRhbHMnKTtcbi8vIFJlLWV4cG9ydCBsZWdhY3kgbWV0aG9kcy5cbmV4cG9ydCBjb25zdCB1bnN0YWJsZV9nZXRTdGF0aWNQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U3RhdGljUHJvcHMnKTtcbmV4cG9ydCBjb25zdCB1bnN0YWJsZV9nZXRTdGF0aWNQYXRocyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U3RhdGljUGF0aHMnKTtcbmV4cG9ydCBjb25zdCB1bnN0YWJsZV9nZXRTdGF0aWNQYXJhbXMgPSBob2lzdCh1c2VybGFuZCwgJ3Vuc3RhYmxlX2dldFN0YXRpY1BhcmFtcycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFNlcnZlclByb3BzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTZXJ2ZXJQcm9wcycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFNlcnZlclNpZGVQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U2VydmVyU2lkZVByb3BzJyk7XG4vLyBDcmVhdGUgYW5kIGV4cG9ydCB0aGUgcm91dGUgbW9kdWxlIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbmV4cG9ydCBjb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBQYWdlc1JvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5QQUdFUyxcbiAgICAgICAgcGFnZTogXCIvaW5kZXhcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL1wiLFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZW4ndCB1c2VkIGluIHByb2R1Y3Rpb24uXG4gICAgICAgIGJ1bmRsZVBhdGg6ICcnLFxuICAgICAgICBmaWxlbmFtZTogJydcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgLy8gZGVmYXVsdCBleHBvcnQgbWlnaHQgbm90IGV4aXN0IHdoZW4gb3B0aW1pemVkIGZvciBkYXRhIG9ubHlcbiAgICAgICAgQXBwOiBhcHAuZGVmYXVsdCxcbiAgICAgICAgRG9jdW1lbnQ6IGRvY3VtZW50LmRlZmF1bHRcbiAgICB9LFxuICAgIHVzZXJsYW5kXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZXMuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F&preferredRegion=&absolutePagePath=.%2Fpages%5Cindex.tsx&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_global_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/global.sass */ \"(pages-dir-node)/./styles/global.sass\");\n/* harmony import */ var _styles_global_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_global_sass__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst App = ({ Component, pageProps })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\_app.tsx\",\n        lineNumber: 5,\n        columnNumber: 12\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUE4QjtBQUc5QixNQUFNQSxNQUFNLENBQUMsRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDM0MscUJBQU8sOERBQUNEO1FBQVcsR0FBR0MsU0FBUzs7Ozs7O0FBQ25DO0FBRUEsaUVBQWVGLEdBQUdBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZW1pbGVcXERlc2t0b3BcXGFuYWx5c2lzXFxhbmFseXNpcy1uZXh0LWFwcFxccGFnZXNcXF9hcHAudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIkAvc3R5bGVzL2dsb2JhbC5zYXNzXCI7XHJcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tIFwibmV4dC9hcHBcIjtcclxuXHJcbmNvbnN0IEFwcCA9ICh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSA9PiB7XHJcbiAgICByZXR1cm4gPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPjtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcDtcclxuIl0sIm5hbWVzIjpbIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dynamic */ \"(pages-dir-node)/./node_modules/next/dynamic.js\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_icons_clocklight_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/icons/clocklight.svg */ \"(pages-dir-node)/./components/icons/clocklight.svg\");\n/* harmony import */ var _components_icons_langchoose_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/icons/langchoose.svg */ \"(pages-dir-node)/./components/icons/langchoose.svg\");\n/* harmony import */ var _components_icons_moonlight_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/icons/moonlight.svg */ \"(pages-dir-node)/./components/icons/moonlight.svg\");\n/* harmony import */ var _components_icons_plus_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/icons/plus.svg */ \"(pages-dir-node)/./components/icons/plus.svg\");\n/* harmony import */ var _components_icons_minus_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/icons/minus.svg */ \"(pages-dir-node)/./components/icons/minus.svg\");\n/* harmony import */ var _components_icons_bar_chart_2_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/icons/bar-chart-2.svg */ \"(pages-dir-node)/./components/icons/bar-chart-2.svg\");\n/* harmony import */ var _components_icons_notifications_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/icons/notifications.svg */ \"(pages-dir-node)/./components/icons/notifications.svg\");\n/* harmony import */ var _components_AddExpense__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/components/AddExpense */ \"(pages-dir-node)/./components/AddExpense.tsx\");\n/* harmony import */ var _components_Pie_ExpenseChart__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/components/Pie/ExpenseChart */ \"(pages-dir-node)/./components/Pie/ExpenseChart.tsx\");\n/* harmony import */ var _styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../styles/components/Home.module.sass */ \"(pages-dir-node)/./styles/components/Home.module.sass\");\n/* harmony import */ var _styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_13__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_AddExpense__WEBPACK_IMPORTED_MODULE_10__, _components_Pie_ExpenseChart__WEBPACK_IMPORTED_MODULE_11__]);\n([_components_AddExpense__WEBPACK_IMPORTED_MODULE_10__, _components_Pie_ExpenseChart__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// Отключаем SSR для Piejs\nconst Piejs = next_dynamic__WEBPACK_IMPORTED_MODULE_2___default()(()=>Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../components/Pie/Pie */ \"(pages-dir-node)/./components/Pie/Pie.tsx\")), {\n    loadableGenerated: {\n        modules: [\n            \"pages\\\\index.tsx -> \" + \"../components/Pie/Pie\"\n        ]\n    },\n    ssr: false\n});\nconst MainScreen = ()=>{\n    const [isModalOpen, setIsModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [expenses, setExpenses] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    // Функция для добавления расхода\n    const handleAddExpense = (name, value, color)=>{\n        setExpenses((prev)=>[\n                ...prev,\n                {\n                    name,\n                    value,\n                    color\n                }\n            ]);\n        setIsModalOpen(false);\n    };\n    // Группируем расходы по категориям, суммируя их значения\n    const mergedExpenses = expenses.reduce((acc, expense)=>{\n        const existing = acc.find((item)=>item.name === expense.name);\n        if (existing) {\n            existing.value += expense.value;\n        } else {\n            acc.push({\n                ...expense\n            });\n        }\n        return acc;\n    }, []);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_13__.useRouter)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().container),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().toppanel),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_clocklight_svg__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                        className: (_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().clickable),\n                        onClick: ()=>router.push(\"/history\")\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().lang),\n                        children: [\n                            \"EN\",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_langchoose_svg__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                                lineNumber: 54,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                        lineNumber: 52,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_moonlight_svg__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                        lineNumber: 56,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                lineNumber: 50,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().mainContent),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Pie_ExpenseChart__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                        lineNumber: 59,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().buttons),\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: `${(_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().button)} ${(_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().minus)}`,\n                                onClick: ()=>setIsModalOpen(true),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_plus_svg__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                                    lineNumber: 62,\n                                    columnNumber: 13\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                                lineNumber: 61,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                className: `${(_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().button)} ${(_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().plus)}`,\n                                onClick: ()=>setIsModalOpen(true),\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_minus_svg__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {}, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                                    lineNumber: 65,\n                                    columnNumber: 13\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                                lineNumber: 64,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                        lineNumber: 60,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                lineNumber: 58,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().bottomPanel),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: `${(_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().bottombutton)} ${(_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().analysis)}`,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_bar_chart_2_svg__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {}, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                                lineNumber: 71,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: \"Analysis\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                                lineNumber: 72,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                        lineNumber: 70,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: `${(_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().bottombutton)} ${(_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().noti)}`,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_icons_notifications_svg__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {}, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: \"Notifications\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                                lineNumber: 76,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                        lineNumber: 74,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                lineNumber: 69,\n                columnNumber: 7\n            }, undefined),\n            isModalOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().modalOverlay),\n                onClick: ()=>setIsModalOpen(false),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_styles_components_Home_module_sass__WEBPACK_IMPORTED_MODULE_12___default().modalContent),\n                    onClick: (e)=>e.stopPropagation(),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AddExpense__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                        onAddExpense: handleAddExpense,\n                        onClose: ()=>setIsModalOpen(false)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                        lineNumber: 82,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                    lineNumber: 81,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n                lineNumber: 80,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\emile\\\\Desktop\\\\analysis\\\\analysis-next-app\\\\pages\\\\index.tsx\",\n        lineNumber: 49,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainScreen);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL2luZGV4LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7QUFDTDtBQUN5QjtBQUNEO0FBQ0Q7QUFDVjtBQUNFO0FBQ1M7QUFDTztBQUNqQjtBQUNRO0FBQ0g7QUFDZDtBQUV4QywwQkFBMEI7QUFDMUIsTUFBTWMsUUFBUVosbURBQU9BLENBQUMsSUFBTSw4SkFBK0I7Ozs7OztJQUFJYSxLQUFLOztBQVNwRSxNQUFNQyxhQUF1QjtJQUMzQixNQUFNLENBQUNDLGFBQWFDLGVBQWUsR0FBR2pCLCtDQUFRQSxDQUFDO0lBQy9DLE1BQU0sQ0FBQ2tCLFVBQVVDLFlBQVksR0FBR25CLCtDQUFRQSxDQUFZLEVBQUU7SUFFdEQsaUNBQWlDO0lBQ2pDLE1BQU1vQixtQkFBbUIsQ0FBQ0MsTUFBY0MsT0FBZUM7UUFDckRKLFlBQVksQ0FBQ0ssT0FBUzttQkFBSUE7Z0JBQU07b0JBQUVIO29CQUFNQztvQkFBT0M7Z0JBQU07YUFBRTtRQUN2RE4sZUFBZTtJQUNqQjtJQUVBLHlEQUF5RDtJQUN6RCxNQUFNUSxpQkFBaUJQLFNBQVNRLE1BQU0sQ0FBWSxDQUFDQyxLQUFLQztRQUN0RCxNQUFNQyxXQUFXRixJQUFJRyxJQUFJLENBQUMsQ0FBQ0MsT0FBU0EsS0FBS1YsSUFBSSxLQUFLTyxRQUFRUCxJQUFJO1FBQzlELElBQUlRLFVBQVU7WUFDWkEsU0FBU1AsS0FBSyxJQUFJTSxRQUFRTixLQUFLO1FBQ2pDLE9BQU87WUFDTEssSUFBSUssSUFBSSxDQUFDO2dCQUFFLEdBQUdKLE9BQU87WUFBQztRQUN4QjtRQUNBLE9BQU9EO0lBQ1QsR0FBRyxFQUFFO0lBRUwsTUFBTU0sU0FBU3JCLHVEQUFTQTtJQUV4QixxQkFDRSw4REFBQ3NCO1FBQUlDLFdBQVd4Qix1RkFBVzs7MEJBQ3pCLDhEQUFDdUI7Z0JBQUlDLFdBQVd4QixzRkFBVTs7a0NBQ3hCLDhEQUFDVCx3RUFBVUE7d0JBQUNpQyxXQUFXeEIsdUZBQVc7d0JBQUU0QixTQUFTLElBQU1OLE9BQU9ELElBQUksQ0FBQzs7Ozs7O2tDQUMvRCw4REFBQ0U7d0JBQUlDLFdBQVd4QixrRkFBTTs7NEJBQUU7MENBRXRCLDhEQUFDUix3RUFBU0E7Ozs7Ozs7Ozs7O2tDQUVaLDhEQUFDQyx1RUFBU0E7Ozs7Ozs7Ozs7OzBCQUVaLDhEQUFDOEI7Z0JBQUlDLFdBQVd4Qix5RkFBYTs7a0NBQzNCLDhEQUFDRCxxRUFBWUE7Ozs7O2tDQUNiLDhEQUFDd0I7d0JBQUlDLFdBQVd4QixxRkFBUzs7MENBQ3ZCLDhEQUFDZ0M7Z0NBQU9SLFdBQVcsR0FBR3hCLG9GQUFRLENBQUMsQ0FBQyxFQUFFQSxtRkFBTyxFQUFFO2dDQUFFNEIsU0FBUyxJQUFNdEIsZUFBZTswQ0FDekUsNEVBQUNaLGtFQUFJQTs7Ozs7Ozs7OzswQ0FFUCw4REFBQ3NDO2dDQUFPUixXQUFXLEdBQUd4QixvRkFBUSxDQUFDLENBQUMsRUFBRUEsa0ZBQU0sRUFBRTtnQ0FBRTRCLFNBQVMsSUFBTXRCLGVBQWU7MENBQ3hFLDRFQUFDWCxtRUFBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBSVosOERBQUM0QjtnQkFBSUMsV0FBV3hCLHlGQUFhOztrQ0FDM0IsOERBQUN1Qjt3QkFBSUMsV0FBVyxHQUFHeEIsMEZBQWMsQ0FBQyxDQUFDLEVBQUVBLHNGQUFVLEVBQUU7OzBDQUMvQyw4REFBQ0oseUVBQVFBOzs7OzswQ0FDVCw4REFBQzBDOzBDQUFFOzs7Ozs7Ozs7Ozs7a0NBRUwsOERBQUNmO3dCQUFJQyxXQUFXLEdBQUd4QiwwRkFBYyxDQUFDLENBQUMsRUFBRUEsa0ZBQU0sRUFBRTs7MENBQzNDLDhEQUFDSCwyRUFBYUE7Ozs7OzBDQUNkLDhEQUFDeUM7MENBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUdOakMsNkJBQ0MsOERBQUNrQjtnQkFBSUMsV0FBV3hCLDBGQUFjO2dCQUFFNEIsU0FBUyxJQUFNdEIsZUFBZTswQkFDNUQsNEVBQUNpQjtvQkFBSUMsV0FBV3hCLDBGQUFjO29CQUFFNEIsU0FBUyxDQUFDYyxJQUFNQSxFQUFFQyxlQUFlOzhCQUNqRSw0RUFBQzdDLCtEQUFVQTt3QkFBQzhDLGNBQWNuQzt3QkFBa0JvQyxTQUFTLElBQU12QyxlQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT3BGO0FBRUEsaUVBQWVGLFVBQVVBLEVBQUMiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZW1pbGVcXERlc2t0b3BcXGFuYWx5c2lzXFxhbmFseXNpcy1uZXh0LWFwcFxccGFnZXNcXGluZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IGR5bmFtaWMgZnJvbSBcIm5leHQvZHluYW1pY1wiO1xyXG5pbXBvcnQgQ2xvY2tsaWdodCBmcm9tIFwiLi4vY29tcG9uZW50cy9pY29ucy9jbG9ja2xpZ2h0LnN2Z1wiO1xyXG5pbXBvcnQgQXJyb3dkb3duIGZyb20gXCIuLi9jb21wb25lbnRzL2ljb25zL2xhbmdjaG9vc2Uuc3ZnXCI7XHJcbmltcG9ydCBNb29ubGlnaHQgZnJvbSBcIi4uL2NvbXBvbmVudHMvaWNvbnMvbW9vbmxpZ2h0LnN2Z1wiO1xyXG5pbXBvcnQgUGx1cyBmcm9tIFwiLi4vY29tcG9uZW50cy9pY29ucy9wbHVzLnN2Z1wiO1xyXG5pbXBvcnQgTWluaXMgZnJvbSBcIi4uL2NvbXBvbmVudHMvaWNvbnMvbWludXMuc3ZnXCI7XHJcbmltcG9ydCBBbmFseXNpcyBmcm9tIFwiLi4vY29tcG9uZW50cy9pY29ucy9iYXItY2hhcnQtMi5zdmdcIjtcclxuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSBcIi4uL2NvbXBvbmVudHMvaWNvbnMvbm90aWZpY2F0aW9ucy5zdmdcIjtcclxuaW1wb3J0IEFkZEV4cGVuc2UgZnJvbSBcIkAvY29tcG9uZW50cy9BZGRFeHBlbnNlXCI7XHJcbmltcG9ydCBFeHBlbnNlQ2hhcnQgZnJvbSBcIkAvY29tcG9uZW50cy9QaWUvRXhwZW5zZUNoYXJ0XCI7XHJcbmltcG9ydCBzIGZyb20gXCIuLi9zdHlsZXMvY29tcG9uZW50cy9Ib21lLm1vZHVsZS5zYXNzXCI7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xyXG5cclxuLy8g0J7RgtC60LvRjtGH0LDQtdC8IFNTUiDQtNC70Y8gUGllanNcclxuY29uc3QgUGllanMgPSBkeW5hbWljKCgpID0+IGltcG9ydChcIi4uL2NvbXBvbmVudHMvUGllL1BpZVwiKSwgeyBzc3I6IGZhbHNlIH0pO1xyXG5cclxuLy8g0KLQuNC/INC00LDQvdC90YvRhSDQtNC70Y8g0YDQsNGB0YXQvtC00L7QslxyXG50eXBlIEV4cGVuc2UgPSB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHZhbHVlOiBudW1iZXI7XHJcbiAgY29sb3I6IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IE1haW5TY3JlZW46IFJlYWN0LkZDID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtpc01vZGFsT3Blbiwgc2V0SXNNb2RhbE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtleHBlbnNlcywgc2V0RXhwZW5zZXNdID0gdXNlU3RhdGU8RXhwZW5zZVtdPihbXSk7XHJcblxyXG4gIC8vINCk0YPQvdC60YbQuNGPINC00LvRjyDQtNC+0LHQsNCy0LvQtdC90LjRjyDRgNCw0YHRhdC+0LTQsFxyXG4gIGNvbnN0IGhhbmRsZUFkZEV4cGVuc2UgPSAobmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSA9PiB7XHJcbiAgICBzZXRFeHBlbnNlcygocHJldikgPT4gWy4uLnByZXYsIHsgbmFtZSwgdmFsdWUsIGNvbG9yIH1dKTtcclxuICAgIHNldElzTW9kYWxPcGVuKGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyDQk9GA0YPQv9C/0LjRgNGD0LXQvCDRgNCw0YHRhdC+0LTRiyDQv9C+INC60LDRgtC10LPQvtGA0LjRj9C8LCDRgdGD0LzQvNC40YDRg9GPINC40YUg0LfQvdCw0YfQtdC90LjRj1xyXG4gIGNvbnN0IG1lcmdlZEV4cGVuc2VzID0gZXhwZW5zZXMucmVkdWNlPEV4cGVuc2VbXT4oKGFjYywgZXhwZW5zZSkgPT4ge1xyXG4gICAgY29uc3QgZXhpc3RpbmcgPSBhY2MuZmluZCgoaXRlbSkgPT4gaXRlbS5uYW1lID09PSBleHBlbnNlLm5hbWUpO1xyXG4gICAgaWYgKGV4aXN0aW5nKSB7XHJcbiAgICAgIGV4aXN0aW5nLnZhbHVlICs9IGV4cGVuc2UudmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhY2MucHVzaCh7IC4uLmV4cGVuc2UgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17cy5jb250YWluZXJ9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17cy50b3BwYW5lbH0+XHJcbiAgICAgICAgPENsb2NrbGlnaHQgY2xhc3NOYW1lPXtzLmNsaWNrYWJsZX0gb25DbGljaz17KCkgPT4gcm91dGVyLnB1c2goXCIvaGlzdG9yeVwiKX0gLz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5sYW5nfT5cclxuICAgICAgICAgIEVOXHJcbiAgICAgICAgICA8QXJyb3dkb3duIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPE1vb25saWdodCAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3MubWFpbkNvbnRlbnR9PlxyXG4gICAgICAgIDxFeHBlbnNlQ2hhcnQvPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLmJ1dHRvbnN9PlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2Ake3MuYnV0dG9ufSAke3MubWludXN9YH0gb25DbGljaz17KCkgPT4gc2V0SXNNb2RhbE9wZW4odHJ1ZSl9PlxyXG4gICAgICAgICAgICA8UGx1cyAvPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YCR7cy5idXR0b259ICR7cy5wbHVzfWB9IG9uQ2xpY2s9eygpID0+IHNldElzTW9kYWxPcGVuKHRydWUpfT5cclxuICAgICAgICAgICAgPE1pbmlzIC8+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLmJvdHRvbVBhbmVsfT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7cy5ib3R0b21idXR0b259ICR7cy5hbmFseXNpc31gfT5cclxuICAgICAgICAgIDxBbmFseXNpcyAvPlxyXG4gICAgICAgICAgPHA+QW5hbHlzaXM8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake3MuYm90dG9tYnV0dG9ufSAke3Mubm90aX1gfT5cclxuICAgICAgICAgIDxOb3RpZmljYXRpb25zIC8+XHJcbiAgICAgICAgICA8cD5Ob3RpZmljYXRpb25zPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAge2lzTW9kYWxPcGVuICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5tb2RhbE92ZXJsYXl9IG9uQ2xpY2s9eygpID0+IHNldElzTW9kYWxPcGVuKGZhbHNlKX0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5tb2RhbENvbnRlbnR9IG9uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfT5cclxuICAgICAgICAgIDxBZGRFeHBlbnNlIG9uQWRkRXhwZW5zZT17aGFuZGxlQWRkRXhwZW5zZX0gb25DbG9zZT17KCkgPT4gc2V0SXNNb2RhbE9wZW4oZmFsc2UpfSAvPlxyXG5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1haW5TY3JlZW47XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiZHluYW1pYyIsIkNsb2NrbGlnaHQiLCJBcnJvd2Rvd24iLCJNb29ubGlnaHQiLCJQbHVzIiwiTWluaXMiLCJBbmFseXNpcyIsIk5vdGlmaWNhdGlvbnMiLCJBZGRFeHBlbnNlIiwiRXhwZW5zZUNoYXJ0IiwicyIsInVzZVJvdXRlciIsIlBpZWpzIiwic3NyIiwiTWFpblNjcmVlbiIsImlzTW9kYWxPcGVuIiwic2V0SXNNb2RhbE9wZW4iLCJleHBlbnNlcyIsInNldEV4cGVuc2VzIiwiaGFuZGxlQWRkRXhwZW5zZSIsIm5hbWUiLCJ2YWx1ZSIsImNvbG9yIiwicHJldiIsIm1lcmdlZEV4cGVuc2VzIiwicmVkdWNlIiwiYWNjIiwiZXhwZW5zZSIsImV4aXN0aW5nIiwiZmluZCIsIml0ZW0iLCJwdXNoIiwicm91dGVyIiwiZGl2IiwiY2xhc3NOYW1lIiwiY29udGFpbmVyIiwidG9wcGFuZWwiLCJjbGlja2FibGUiLCJvbkNsaWNrIiwibGFuZyIsIm1haW5Db250ZW50IiwiYnV0dG9ucyIsImJ1dHRvbiIsIm1pbnVzIiwicGx1cyIsImJvdHRvbVBhbmVsIiwiYm90dG9tYnV0dG9uIiwiYW5hbHlzaXMiLCJwIiwibm90aSIsIm1vZGFsT3ZlcmxheSIsIm1vZGFsQ29udGVudCIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkFkZEV4cGVuc2UiLCJvbkNsb3NlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/index.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/components/AddExpense.module.sass":
/*!**************************************************!*\
  !*** ./styles/components/AddExpense.module.sass ***!
  \**************************************************/
/***/ ((module) => {

eval("// Exports\nmodule.exports = {\n\t\"container\": \"AddExpense_container__MRee2\",\n\t\"window\": \"AddExpense_window__EJ1wZ\",\n\t\"title\": \"AddExpense_title__ENWkj\",\n\t\"table\": \"AddExpense_table__tJbyj\",\n\t\"point\": \"AddExpense_point__4VvLK\",\n\t\"round\": \"AddExpense_round__JxnNz\",\n\t\"transport\": \"AddExpense_transport__83tqv\",\n\t\"food\": \"AddExpense_food__Jr_g0\",\n\t\"entertainment\": \"AddExpense_entertainment__AzyuT\",\n\t\"outfit\": \"AddExpense_outfit__rQ9ZE\",\n\t\"gifts\": \"AddExpense_gifts__uqyxL\",\n\t\"subscriptions\": \"AddExpense_subscriptions__U_mDS\",\n\t\"education\": \"AddExpense_education__PaB2n\",\n\t\"health\": \"AddExpense_health__GRF8G\",\n\t\"household\": \"AddExpense_household__UnnLm\",\n\t\"transfer\": \"AddExpense_transfer__oKteV\",\n\t\"lending\": \"AddExpense_lending__TRTpM\",\n\t\"other\": \"AddExpense_other__N0Jo6\",\n\t\"amountInput\": \"AddExpense_amountInput__WQnJB\",\n\t\"input\": \"AddExpense_input__7Fylv\",\n\t\"buttons\": \"AddExpense_buttons__9nA5W\",\n\t\"cancel\": \"AddExpense_cancel__2_8FV\",\n\t\"submit\": \"AddExpense_submit__pwDsC\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3N0eWxlcy9jb21wb25lbnRzL0FkZEV4cGVuc2UubW9kdWxlLnNhc3MiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxlbWlsZVxcRGVza3RvcFxcYW5hbHlzaXNcXGFuYWx5c2lzLW5leHQtYXBwXFxzdHlsZXNcXGNvbXBvbmVudHNcXEFkZEV4cGVuc2UubW9kdWxlLnNhc3MiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiY29udGFpbmVyXCI6IFwiQWRkRXhwZW5zZV9jb250YWluZXJfX01SZWUyXCIsXG5cdFwid2luZG93XCI6IFwiQWRkRXhwZW5zZV93aW5kb3dfX0VKMXdaXCIsXG5cdFwidGl0bGVcIjogXCJBZGRFeHBlbnNlX3RpdGxlX19FTldralwiLFxuXHRcInRhYmxlXCI6IFwiQWRkRXhwZW5zZV90YWJsZV9fdEpieWpcIixcblx0XCJwb2ludFwiOiBcIkFkZEV4cGVuc2VfcG9pbnRfXzRWdkxLXCIsXG5cdFwicm91bmRcIjogXCJBZGRFeHBlbnNlX3JvdW5kX19KeG5OelwiLFxuXHRcInRyYW5zcG9ydFwiOiBcIkFkZEV4cGVuc2VfdHJhbnNwb3J0X184M3RxdlwiLFxuXHRcImZvb2RcIjogXCJBZGRFeHBlbnNlX2Zvb2RfX0pyX2cwXCIsXG5cdFwiZW50ZXJ0YWlubWVudFwiOiBcIkFkZEV4cGVuc2VfZW50ZXJ0YWlubWVudF9fQXp5dVRcIixcblx0XCJvdXRmaXRcIjogXCJBZGRFeHBlbnNlX291dGZpdF9fclE5WkVcIixcblx0XCJnaWZ0c1wiOiBcIkFkZEV4cGVuc2VfZ2lmdHNfX3VxeXhMXCIsXG5cdFwic3Vic2NyaXB0aW9uc1wiOiBcIkFkZEV4cGVuc2Vfc3Vic2NyaXB0aW9uc19fVV9tRFNcIixcblx0XCJlZHVjYXRpb25cIjogXCJBZGRFeHBlbnNlX2VkdWNhdGlvbl9fUGFCMm5cIixcblx0XCJoZWFsdGhcIjogXCJBZGRFeHBlbnNlX2hlYWx0aF9fR1JGOEdcIixcblx0XCJob3VzZWhvbGRcIjogXCJBZGRFeHBlbnNlX2hvdXNlaG9sZF9fVW5uTG1cIixcblx0XCJ0cmFuc2ZlclwiOiBcIkFkZEV4cGVuc2VfdHJhbnNmZXJfX29LdGVWXCIsXG5cdFwibGVuZGluZ1wiOiBcIkFkZEV4cGVuc2VfbGVuZGluZ19fVFJUcE1cIixcblx0XCJvdGhlclwiOiBcIkFkZEV4cGVuc2Vfb3RoZXJfX04wSm82XCIsXG5cdFwiYW1vdW50SW5wdXRcIjogXCJBZGRFeHBlbnNlX2Ftb3VudElucHV0X19XUW5KQlwiLFxuXHRcImlucHV0XCI6IFwiQWRkRXhwZW5zZV9pbnB1dF9fN0Z5bHZcIixcblx0XCJidXR0b25zXCI6IFwiQWRkRXhwZW5zZV9idXR0b25zX185bkE1V1wiLFxuXHRcImNhbmNlbFwiOiBcIkFkZEV4cGVuc2VfY2FuY2VsX18yXzhGVlwiLFxuXHRcInN1Ym1pdFwiOiBcIkFkZEV4cGVuc2Vfc3VibWl0X19wd0RzQ1wiXG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./styles/components/AddExpense.module.sass\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/components/Home.module.sass":
/*!********************************************!*\
  !*** ./styles/components/Home.module.sass ***!
  \********************************************/
/***/ ((module) => {

eval("// Exports\nmodule.exports = {\n\t\"container\": \"Home_container__URx7a\",\n\t\"toppanel\": \"Home_toppanel__vQYnJ\",\n\t\"lang\": \"Home_lang__uAb_a\",\n\t\"mainContent\": \"Home_mainContent__Iq_3f\",\n\t\"buttons\": \"Home_buttons__16Wzw\",\n\t\"button\": \"Home_button__s_ZvH\",\n\t\"bottomPanel\": \"Home_bottomPanel__qSqM8\",\n\t\"bottombutton\": \"Home_bottombutton__zaFZ8\",\n\t\"modalOverlay\": \"Home_modalOverlay___J89j\",\n\t\"modalContent\": \"Home_modalContent___PMCk\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3N0eWxlcy9jb21wb25lbnRzL0hvbWUubW9kdWxlLnNhc3MiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZW1pbGVcXERlc2t0b3BcXGFuYWx5c2lzXFxhbmFseXNpcy1uZXh0LWFwcFxcc3R5bGVzXFxjb21wb25lbnRzXFxIb21lLm1vZHVsZS5zYXNzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImNvbnRhaW5lclwiOiBcIkhvbWVfY29udGFpbmVyX19VUng3YVwiLFxuXHRcInRvcHBhbmVsXCI6IFwiSG9tZV90b3BwYW5lbF9fdlFZbkpcIixcblx0XCJsYW5nXCI6IFwiSG9tZV9sYW5nX191QWJfYVwiLFxuXHRcIm1haW5Db250ZW50XCI6IFwiSG9tZV9tYWluQ29udGVudF9fSXFfM2ZcIixcblx0XCJidXR0b25zXCI6IFwiSG9tZV9idXR0b25zX18xNld6d1wiLFxuXHRcImJ1dHRvblwiOiBcIkhvbWVfYnV0dG9uX19zX1p2SFwiLFxuXHRcImJvdHRvbVBhbmVsXCI6IFwiSG9tZV9ib3R0b21QYW5lbF9fcVNxTThcIixcblx0XCJib3R0b21idXR0b25cIjogXCJIb21lX2JvdHRvbWJ1dHRvbl9femFGWjhcIixcblx0XCJtb2RhbE92ZXJsYXlcIjogXCJIb21lX21vZGFsT3ZlcmxheV9fX0o4OWpcIixcblx0XCJtb2RhbENvbnRlbnRcIjogXCJIb21lX21vZGFsQ29udGVudF9fX1BNQ2tcIlxufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./styles/components/Home.module.sass\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/global.sass":
/*!****************************!*\
  !*** ./styles/global.sass ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/__barrel_optimize__?names=Cell,Pie,PieChart!=!./node_modules/recharts/es6/index.js":
/*!******************************************************************************************!*\
  !*** __barrel_optimize__?names=Cell,Pie,PieChart!=!./node_modules/recharts/es6/index.js ***!
  \******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Cell: () => (/* reexport safe */ _component_Cell__WEBPACK_IMPORTED_MODULE_0__.Cell),\n/* harmony export */   Pie: () => (/* reexport safe */ _polar_Pie__WEBPACK_IMPORTED_MODULE_1__.Pie),\n/* harmony export */   PieChart: () => (/* reexport safe */ _chart_PieChart__WEBPACK_IMPORTED_MODULE_2__.PieChart)\n/* harmony export */ });\n/* harmony import */ var _component_Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component/Cell */ \"(pages-dir-node)/./node_modules/recharts/es6/component/Cell.js\");\n/* harmony import */ var _polar_Pie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polar/Pie */ \"(pages-dir-node)/./node_modules/recharts/es6/polar/Pie.js\");\n/* harmony import */ var _chart_PieChart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chart/PieChart */ \"(pages-dir-node)/./node_modules/recharts/es6/chart/PieChart.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_polar_Pie__WEBPACK_IMPORTED_MODULE_1__, _chart_PieChart__WEBPACK_IMPORTED_MODULE_2__]);\n([_polar_Pie__WEBPACK_IMPORTED_MODULE_1__, _chart_PieChart__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS9fX2JhcnJlbF9vcHRpbWl6ZV9fP25hbWVzPUNlbGwsUGllLFBpZUNoYXJ0IT0hLi9ub2RlX21vZHVsZXMvcmVjaGFydHMvZXM2L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDdUM7QUFDTiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxlbWlsZVxcRGVza3RvcFxcYW5hbHlzaXNcXGFuYWx5c2lzLW5leHQtYXBwXFxub2RlX21vZHVsZXNcXHJlY2hhcnRzXFxlczZcXGluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IHsgQ2VsbCB9IGZyb20gXCIuL2NvbXBvbmVudC9DZWxsXCJcbmV4cG9ydCB7IFBpZSB9IGZyb20gXCIuL3BvbGFyL1BpZVwiXG5leHBvcnQgeyBQaWVDaGFydCB9IGZyb20gXCIuL2NoYXJ0L1BpZUNoYXJ0XCIiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/__barrel_optimize__?names=Cell,Pie,PieChart!=!./node_modules/recharts/es6/index.js\n");

/***/ }),

/***/ "clsx":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = import("clsx");;

/***/ }),

/***/ "eventemitter3":
/*!********************************!*\
  !*** external "eventemitter3" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("eventemitter3");

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/app");;

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/firestore");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "lodash/every":
/*!*******************************!*\
  !*** external "lodash/every" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/every");

/***/ }),

/***/ "lodash/find":
/*!******************************!*\
  !*** external "lodash/find" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/find");

/***/ }),

/***/ "lodash/flatMap":
/*!*********************************!*\
  !*** external "lodash/flatMap" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/flatMap");

/***/ }),

/***/ "lodash/get":
/*!*****************************!*\
  !*** external "lodash/get" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/get");

/***/ }),

/***/ "lodash/isBoolean":
/*!***********************************!*\
  !*** external "lodash/isBoolean" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/isBoolean");

/***/ }),

/***/ "lodash/isEqual":
/*!*********************************!*\
  !*** external "lodash/isEqual" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/isEqual");

/***/ }),

/***/ "lodash/isFunction":
/*!************************************!*\
  !*** external "lodash/isFunction" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/isFunction");

/***/ }),

/***/ "lodash/isNaN":
/*!*******************************!*\
  !*** external "lodash/isNaN" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/isNaN");

/***/ }),

/***/ "lodash/isNil":
/*!*******************************!*\
  !*** external "lodash/isNil" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/isNil");

/***/ }),

/***/ "lodash/isNumber":
/*!**********************************!*\
  !*** external "lodash/isNumber" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/isNumber");

/***/ }),

/***/ "lodash/isObject":
/*!**********************************!*\
  !*** external "lodash/isObject" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/isObject");

/***/ }),

/***/ "lodash/isPlainObject":
/*!***************************************!*\
  !*** external "lodash/isPlainObject" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/isPlainObject");

/***/ }),

/***/ "lodash/isString":
/*!**********************************!*\
  !*** external "lodash/isString" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/isString");

/***/ }),

/***/ "lodash/last":
/*!******************************!*\
  !*** external "lodash/last" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/last");

/***/ }),

/***/ "lodash/mapValues":
/*!***********************************!*\
  !*** external "lodash/mapValues" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/mapValues");

/***/ }),

/***/ "lodash/max":
/*!*****************************!*\
  !*** external "lodash/max" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/max");

/***/ }),

/***/ "lodash/maxBy":
/*!*******************************!*\
  !*** external "lodash/maxBy" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/maxBy");

/***/ }),

/***/ "lodash/memoize":
/*!*********************************!*\
  !*** external "lodash/memoize" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/memoize");

/***/ }),

/***/ "lodash/min":
/*!*****************************!*\
  !*** external "lodash/min" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/min");

/***/ }),

/***/ "lodash/minBy":
/*!*******************************!*\
  !*** external "lodash/minBy" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/minBy");

/***/ }),

/***/ "lodash/range":
/*!*******************************!*\
  !*** external "lodash/range" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/range");

/***/ }),

/***/ "lodash/some":
/*!******************************!*\
  !*** external "lodash/some" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/some");

/***/ }),

/***/ "lodash/sortBy":
/*!********************************!*\
  !*** external "lodash/sortBy" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/sortBy");

/***/ }),

/***/ "lodash/throttle":
/*!**********************************!*\
  !*** external "lodash/throttle" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/throttle");

/***/ }),

/***/ "lodash/uniqBy":
/*!********************************!*\
  !*** external "lodash/uniqBy" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/uniqBy");

/***/ }),

/***/ "lodash/upperFirst":
/*!************************************!*\
  !*** external "lodash/upperFirst" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash/upperFirst");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-is");

/***/ }),

/***/ "react-smooth":
/*!*******************************!*\
  !*** external "react-smooth" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-smooth");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "recharts-scale":
/*!*********************************!*\
  !*** external "recharts-scale" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("recharts-scale");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tiny-invariant":
/*!*********************************!*\
  !*** external "tiny-invariant" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = import("tiny-invariant");;

/***/ }),

/***/ "victory-vendor/d3-scale":
/*!******************************************!*\
  !*** external "victory-vendor/d3-scale" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("victory-vendor/d3-scale");

/***/ }),

/***/ "victory-vendor/d3-shape":
/*!******************************************!*\
  !*** external "victory-vendor/d3-shape" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("victory-vendor/d3-shape");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/recharts"], () => (__webpack_exec__("(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2F&preferredRegion=&absolutePagePath=.%2Fpages%5Cindex.tsx&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();