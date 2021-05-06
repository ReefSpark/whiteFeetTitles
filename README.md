## Project Name 
    Core-api for Shibaura Machine
 
## Naming Conventions
*varible names* - camelCase `Eg: firstName` - give special attention to singular and plural

*function names* - camelCase `Eg: validateEmail` - use meaningful names and give special attention to singular and plural

	A function should be used to perform only one operation
        max 20 lines
        
*file names* - snakeCase `Eg: account-details.js`

*Indendations*

	use space before and after "=" in variable declaration
	use tab to indent function body	
	use function or condition opening in the same line (Eg: if(val > 10) { )
    
Use comments if it really needs to be explained

```
/**
* @method 
* @params 
* @returns 
*
*/
```


## Endpoint Response json format


### many:

```
{
  data: [
    {
       id: 1234567
       type: "users",
       attributes: {
         field1: "valu1",
         field2: "value2"
       }
    },
    {
       id: 4879879,
       type: "users",
       attributes: {
         field1: "valu1",
         field2: "value2"
       }
    }
  ]
}
```


### one:

```
{
  data: {
    id: 37827482,
    type: "users",
    attributes: {
       field1: "valu1",
       field2: "value2"
    },
    relationship: {
      asset: {
        data: [
	  {
	    id: 4879879,
            type: "asset"
	  },
	  {
	    id: 8787898,
            type: "asset"
	  },
        ]
      }	 
    }
  }
}
```

# whiteFeetTitles
