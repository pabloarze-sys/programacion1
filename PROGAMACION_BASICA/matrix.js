class Matrix {
    rows;
    cols;
    data;

    constructor (rowsParam, colsParam, defaultValue){
        this.rows = rowsParam
        this.cols = colsParam
        this.data = [];

        for (let i = 0; i < rowsParam; i++){
            const rowTemp = [];
            for(let j = 0; j < colsParam; j++){
                rowTemp.push(defaultValue);
            }
            this.data.push(rowTemp);
        }
    }

    isValidPosition(row, col){
        return row >= 0 && row < this.rows && col < this.cols;
     }  
    
    setValue(row, col, value){
        if(this.isValidPosition(row,col)){
        this.data[row][col] = value;
    }
    }
    
    getValue(row, col){
        if(this.isValidPosition(row,col)){
            this.data[row][col];
        }else{
            return null
        }

    }

    fillRandom(min,max){
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                const random = Math.floor(Math.random()*(max - min + 1)) + min;
                this.data[i][j] = random;
            }
        }
    }
   
    fillIncrementRows(){
        var initialValue = 1;
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                this.data[i][j] = initialValue;
            }
            initialValue++;
        }
    }
   
    toString(){
        return this.data.map(row => row.join('\t')).join('\n');
    }
   
}