[目录](./)
# 从excel中生成json

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Excel输出转换工具</title>
		<script type="text/javascript" src="./js/xlsx.mini.js"></script>
		<style type="text/css">
		.options-box>div {
			display: inline-block;
			vertical-align: top;
			min-width: 750px;
		}

		pre {
			border: 1px solid #CCCCCC;
			margin: 4px;
			padding: 10px;
		}
	</style>
	</head>
	<body>
		<div>
			<fieldset>
				<legend>①参数配置</legend>
				<div class="options-box">
					<div>
						<textarea id="target" cols="100" rows="20">
[
	{
		"Sheet": "Bank Information",
		"start": 8,
		"end": 211,
		"comments":["A","C"],
		"Name": "B",
		"Addr": "H",
		"Unit": "I",
		"Attribute": "J",
		"Type": "K"
	}
	{
		"Sheet": "Aircondition",
		"start": 2,
		"end": 77,
		"comments":["A","C"],
		"Name": "B",
		"Addr": "H",
		"Unit": "I",
		"Attribute": "J",
		"Type": "K"
	},
	{
		"Sheet": "Fire protection",
		"start": 2,
		"end": 26,
		"comments":["A","C"],
		"Name": "B",
		"Addr": "H",
		"Unit": "I",
		"Attribute": "J",
		"Type": "K"
	},
]</textarea>
					</div>
					<div>
						示例和说明：
						<pre>{
	"Sheet": "Bank Information", // 这是所选 Sheet 页的名称
	"start": 8, // 开始行
	"end": 211, // 结束行
	"comments":["A","C"], // 注释所在列，可有有多个值，如果点表对应位置没有值，则填空白
	"Name": "B", // 项目名所在列，如果点表对应位置没有值，则填空白
	"Addr": "H", // 地址所在列，如果没有地址，则不输出当前行
	"Unit": "I", // 精度，如果没有填值，则默认为1
	"Attribute": "J", // RW值所在列，如果点表对应位置没有值，则填空白
	"Type": "K" // 数据类型所在列，如果点表对应位置没有值，则填空白
}</pre>
					</div>
				</div>
			</fieldset>
			<fieldset>
				<legend>②选择Excel文件</legend>
				<input type="file" onchange="readWorkbookFromLocalFile(this.files[0])" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
			</fieldset>
			<fieldset>
				<legend>③生成JSON文件</legend>
				<button onclick="getJSONFile()">生成JSON文件</button>
			</fieldset>
		</div>
		<div id="codeArea"></div>
	</body>
	<script type="text/javascript">

		let outData, workBook;

		// 读取Excel文件
		function readWorkbookFromLocalFile(file, callback) {
			var reader = new FileReader();
			reader.onload = function(e) {
				var data = e.target.result;
				// 读取二进制的excel
				workBook = XLSX.read(data, {type: 'binary'});
			};
			reader.readAsBinaryString(file);
		}

		function getJSONFile() {
			let output = [];
			let options = document.getElementById("target");
			options = JSON.parse(options.value);

			for (const option of options) {
				const { Sheet, start, end } = option;
				const sheet = workBook.Sheets[Sheet];

				const row = [];
				for (let i = start; i <= end; i++) {
					let comments = [];
					for (const comment of option.comments) {
						comments.push(sheet[`${comment}${i}`]);
					}

					let key = sheet[`${option.Name}${i}`];
					let addr = sheet[`${option.Addr}${i}`];
					let attr = sheet[`${option.Attribute}${i}`];
					let type = sheet[`${option.Type}${i}`];
					let ratio = sheet[`${option.Unit}${i}`];

					try {
						addr = (addr ? addr.v : "").trim();
						if (!addr) continue;

						let comment = comments.map((element)=> {
							return (element ? element.v : "").toString().trim()
						});
						comment = comment.join(" ");
						key = (key ? key.v : "").toString().trim();
						attr = (attr ? attr.v : "").toString().trim();
						type = (type ? type.v : "").toString().trim();
						ratio = (ratio ? ratio.v : "").toString().trim();

						comment = comment.replace(/(\r\n|\n|\r)/g, ";");
						key = key.replace(/(\r\n|\n|\r)/g, ";");
						addr = addr.replace(/(\r\n|\n|\r)/g, ";");
						addr = addr.replace(/0(X|x)/g,"0x");
						attr = attr.replace(/(\r\n|\n|\r)/g, ";").toUpperCase();
						type = type.replace(/(\r\n|\n|\r)/g, ";").toUpperCase();
						ratio = parseFloat(ratio);
						if (isNaN(ratio)) {
							ratio = 1;
						}

						const mateched = /([a-zA-Z]+)(\d+)/.exec(type);

						if (mateched !== null) {
							[, typeUnit, typeVal ] = mateched;

							switch (typeUnit) {
								case "U" :
								case "UINT" :
									type = `UINT${typeVal}`;
									break;
								case "S" :
								case "INT" :
									type = `INT${typeVal}`;
									break;
							}
						}

						const line = `[ "${key}" , \t"${addr}" ,\t "${type}" ,\t "${ratio}" ,\t "${comment}" ]`;
						row.push(line);
					} catch (err) {
						console.log(err);
					}
				}

				const page = `"${name}":[\n\t${row.join(',\n\t')}\n],`;
				output.push(page);
			}

			outData = output.join("\n");
			outData = outData.slice(0, outData.length - 1);
			outData = `{\n${outData}\n}`;

			const blob = new Blob([outData], {type: 'Files'});
			const link = document.createElement('a');
			link.download = `输出-${Date.now()}.json`;
			link.style.display = 'none';
			link.href = URL.createObjectURL(blob);
			document.body.appendChild(link);
			link.click();
			URL.revokeObjectURL(link.href) ; // 释放URL 对象
			document.body.removeChild(link);
		}
	</script>
</html>
```