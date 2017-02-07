/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityInput = document.getElementById('aqi-city-input');
var aqiInput = document.getElementById('aqi-value-input');
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = cityInput.value.trim();
    var aqi = aqiInput.value.trim();

    if (!city.match(/^[A-Za-z\u4e00-\u9fa5]+$/)) {
        alert("The city you entered is wrong!");
        return;
    }

    if (!aqi.match(/^\d+$/)) {
        alert("The number you entered is wrong!");
        return;
    }

    aqiData[city] = aqi;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var item = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for (var city in aqiData) {
        item += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button data-city='" + city + "'>DELETE</button></td></tr>";
    }
    document.getElementById('aqi-table').innerHTML = city ? item : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var oBtn = document.getElementById('add-btn');
    oBtn.addEventListener("click", addBtnHandle);

    var oTable = document.getElementById('aqi-table');
    oTable.addEventListener("click", function(event) {
        if (event.target.nodeName.toLowerCase() === "button") delBtnHandle.call(null, event.target.dataset.city);
    });
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
