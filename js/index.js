//canvasの設定（せってい）
var canvas = document.getElementById( 'canvas' );
squareSize = 48;
canvas.width = squareSize*20;		//canvasの横幅（よこはば）
canvas.height = squareSize*20;	//canvasの縦幅（たてはば）
 
//コンテキストを取得（しゅとく）
var ctx = canvas.getContext( '2d' );

// xとy座標
var xy = document.getElementById( 'xy' );
 
//キャラクターのオブジェクトを作成
var rico = new Object();
rico.img = new Image();
rico.img.src = 'img/test2.png';
rico.x = 0;
rico.y = 0;
rico.move = 0;
 
//マップチップのImageオブジェクトを作る
var mapchip = new Image();
mapchip.src = 'img/map2.png';

//マップチップのImageオブジェクトを作る
var lussy = new Image();
lussy.src = 'img/boss.png';
 
//キーボードのオブジェクトを作成
var key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';
 
//マップの作成（さくせい） 20x20マス
var map = [
	[0, 1, 0, 0, 1, 0, 0, 0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0],
	[0, 1, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0],
	[0, 0, 1, 1, 0, 0, 0, 1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 0, 0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0],
	[0, 3, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0],
	[0, 1, 1, 1, 0, 0, 0, 0 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0],
	[0, 0, 0, 1, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	[1, 1, 0, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1],
	[1, 0, 0, 0, 0, 0, 1, 1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0],
	[1, 0, 1, 1, 1, 0, 0, 0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 1, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1],
	[0, 0, 1, 0, 0, 1, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 0, 1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0],
	[0, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0],
	[1, 1, 0, 1, 0, 1, 0, 1 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0],
	[0, 0, 0, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	[0, 1, 1, 1, 0, 1, 0, 0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1],
	[0, 1, 0, 0, 0, 1, 0, 1 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	[0, 0, 0, 1, 0, 0, 0, 1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,0]
]
 
//メインループ
function main() {
	//塗りつぶす色を指定
	ctx.fillStyle = "rgb( 0, 0, 0 )";
	//塗りつぶす
	ctx.fillRect(0, 0, canvas.width, canvas.height);
 
	for (var y=0; y<map.length; y++) {
		for (var x=0; x<map[y].length; x++) {
			// map画像の左側を描画
			if ( map[y][x] === 0 ) ctx.drawImage( mapchip, 0, 0, squareSize, squareSize, squareSize*x, squareSize*y, squareSize, squareSize );
			// map画像の右側を描画
			if ( map[y][x] === 1 ) ctx.drawImage( mapchip, squareSize, 0, squareSize, squareSize, squareSize*x, squareSize*y, squareSize, squareSize );
			// lussy
			if ( map[y][x] === 3 ) ctx.drawImage( lussy, 0, 0, squareSize, squareSize, squareSize*x, squareSize*y, squareSize, squareSize );
		}
	}
 
	//画像を表示
	ctx.drawImage( rico.img, rico.x, rico.y );
	
	// キーを押したとき関数が呼ばれる
	addEventListener("keydown", keydownfunc, false);
	addEventListener("keyup", keyupfunc, false);
 
	//方向キーが押されている場合（ばあい）は、りこちゃんが移動する
	if ( rico.move === 0 ) { // 止まってるとき
		if ( key.left === true ) {
			var x = rico.x/squareSize;
			var y = rico.y/squareSize;
			x--;
			if ( map[y][x] === 0 ) {
				rico.move = squareSize;
				key.push = 'left';
			} else if (map[y][x] === 3) {
				rico.move = squareSize;
				key.push = 'left';
				goal();
			}
		}
		if ( key.up === true ) {
			var x = rico.x/squareSize;
			var y = rico.y/squareSize;
			if ( y > 0) {
				y--;
				if ( map[y][x] === 0 ) {
					rico.move = squareSize;
					key.push = 'up';
				} else if (map[y][x] === 3) {
					rico.move = squareSize;
					key.push = 'up';
					goal();
				}
			}
		}
		if ( key.right === true ) {
			var x = rico.x/squareSize;
			var y = rico.y/squareSize;
			x++;
			if ( map[y][x] === 0 ) {
				rico.move = squareSize;
				key.push = 'right';
			} else if (map[y][x] === 3) {
				rico.move = squareSize;
				key.push = 'right';
				goal();
			}
		}
		if ( key.down === true ) {
			var x = rico.x/squareSize;
			var y = rico.y/squareSize;
			if ( y < 19 ) {
				y++;
				if ( map[y][x] === 0 ) {
					rico.move = squareSize;
					key.push = 'down';
				} else if (map[y][x] === 3) {
					rico.move = squareSize;
					key.push = 'down';
					goal();
				}
			}
		}
	}
 
	//rico.moveが0より大きい場合は、4pxずつ移動（いどう）を続ける
	if (rico.move > 0) {
		rico.move -= 4;
		if ( key.push === 'left' ) rico.x -= 4;
		if ( key.push === 'up' ) rico.y -= 4;
		if ( key.push === 'right' ) rico.x += 4;
		if ( key.push === 'down' ) rico.y += 4;
	}
	
	// xy表示
	xy.innerText = "x座標:y座標　" + rico.x + ":" + rico.y

	requestAnimationFrame( main );
}
//ページと依存（いぞん）している全てのデータが読み込まれたら、メインループ開始
addEventListener('load', main(), false);
 
//キーボードが押されたときに呼び出される関数（かんすう）
function keydownfunc( event ) {
	var key_code = event.keyCode;
	if( key_code === 37 ) key.left = true;
	if( key_code === 38 ) key.up = true;
	if( key_code === 39 ) key.right = true;
	if( key_code === 40 ) key.down = true;
	event.preventDefault();		//方向キーでブラウザがスクロールしないようにする
}
 
//キーボードが放（はな）されたときに呼び出される関数
function keyupfunc( event ) {
	var key_code = event.keyCode;
	if( key_code === 37 ) key.left = false;
	if( key_code === 38 ) key.up = false;
	if( key_code === 39 ) key.right = false;
	if( key_code === 40 ) key.down = false;
}

// ゴールしたときのポップアップ
function goal() {
	var dialog = document.getElementById('dialog');
	var yes = document.getElementById('yes');
	var no = document.getElementById('no');

	var test;
	dialog.style.display = 'block';

	// yesをクリックしたとき
	yes.addEventListener('click', function(){ 
		var url = "https://gongon84.github.io/gogo-site/lussy"
		if ( test === null ){
			test.close()
		} else {
			test = window.open(url, '_blank')
		}
		dialog.style.display = 'none';
	});

	// noをクリックしたとき
	no.addEventListener('click', function(){ 
		dialog.style.display = 'none';
	});

	// 関数呼び出し
	document.body.addEventListener('keydown', closeDialog);
}

// ダイアログ閉じる
function closeDialog() {
	if ( event.key === 'q' ) {
		dialog.style.display = 'none';
		window.opener.close()
	}
}