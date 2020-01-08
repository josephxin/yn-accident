/*
 *针对element ui  table 横向滚动条的优化  ，点击tab也可以拖动
 * 
 * idName  自己命名id
 * className   id 下面的滚动条所在的class 名
 * 
 * "table-wrap","el-table__body-wrapper"
 * 
 *  例 ： horizontalScrollBarDrag("table-wrap","el-table__body-wrapper")
 * */

const horizontalScrollBarDrag = (idName, className) => {
	let tableScrollX; //当前按下鼠标的位置
	let tableWrapper; //当前滚动条的位置
	let id = document.getElementById(idName);
	let childrenClass = id.getElementsByClassName(className)[0];
	id.onmousedown = (e) => {
		e = e || window.event
		tableScrollX = e.pageX
		tableWrapper = childrenClass.scrollLeft
		id.onmousemove = (e) => {
			e = e || window.event
			childrenClass.scrollLeft = tableWrapper + (tableScrollX - e.pageX)
		}
		document.onmouseup = (e) => {
			e.preventDefault();
			id.onmousemove = null;
			document.onmouseup = null;
		}
	}
}

export default horizontalScrollBarDrag