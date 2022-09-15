class drawImg {
    constructor(selector, color, src, imgWidth, startIndex,direction='lr') {
        // selector 容器id, color 填充颜色, src 图片路径, imgWidth 宽度, startIndex 开始的位置,direction 方向 lr =>从左往右  rl =>从右往左
        this.canvas = document.getElementById(selector);
        this.ctx = this.canvas.getContext('2d');
        this.color = color;
        this.man;
        this.src = src;
        this.imgWidth=imgWidth;
        this.startIndex = startIndex;
        this.direction = direction;
    };
    drawImage(num, percent) {
        let imgWidth = this.imgWidth, startIndex = this.startIndex;
        this.man = new Image();
        this.man.src = this.src;
        if (this.ctx) {
            this.man.onload = () => {
                let pre=percent % 10==0?'10':percent % 10;
                for (let i = 0; i < num; i++) {
                    
                    this.ctx.drawImage(this.man, (startIndex + i) * imgWidth, 0)
                    if(this.direction=='lr'){
                        if (i == 0) {
                            this.getColorData(i, ((10-pre) / 10));
                        } else {
                            // this.getColorData(i, 1);
                        }
                    }else if(this.direction=='rl'){
                        if (i == num-1) {
                            this.getColorData(i, ((10-pre) / 10));
                        } else {
                            // this.getColorData(i, 1);
                        }
                    }
                    
                }
            }
        }


    };
    getColorData(index, percent) {
        let imgWidth = this.imgWidth, startIndex = this.startIndex;
        // //console.log(this.man.height)
        // //console.log(this.canvas.height)
        let imageD = this.ctx.getImageData(imgWidth * (startIndex + index), 0, this.man.width, this.man.height);
        let pdata = imageD.data;
        let colorArr = this.color.split(",");
        let dataLen = pdata.length;
        // 从上往下
        let colorLen = dataLen * percent;
        for (var j = 0; j < colorLen; j += 4) {
            pdata[j] = colorArr[0];
            pdata[j + 1] = colorArr[1];
            pdata[j + 2] = colorArr[2];
        }
       
        // 从下往上
        // let colorLen = dataLen * (1 - percent);
        // for (let i = dataLen - 1; i > colorLen; i -= 4) {
        //     // pdata[i] = 0;
        //     pdata[i-1] = colorArr[2];
        //     pdata[i - 2] = colorArr[1];
        //     pdata[i - 3] = colorArr[0];
        // }
        // //console.log(pdata)
        this.ctx.putImageData(imageD, imgWidth * (startIndex + index), 0);
    };
    colorChange(percent) {
        let imgWidth = this.imgWidth, startIndex = this.startIndex;
        // percent是整数，比如 78% percent=78 ，一个图是10%
        let len = Math.ceil(percent / 10);
        if(percent%10=='0'){
            this.imgWidth = this.canvas.width/10;
        }else{
            this.imgWidth = this.canvas.width/11;
        }
        this.drawImage(len, percent)

    };
}

export default drawImg;