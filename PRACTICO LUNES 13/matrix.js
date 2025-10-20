class Matrix {
    rows;
    cols;
    data;
    constructor( rowsParam, colsParam, defaulValue = 0){
        this.rows = rowsParam;
        this.cols = colsParam;
        this.data = [];

        for ( let i = 0;i < rowsParam; i ++){
            const rowTemp = [];
            for (let j = 0;  j < colsParam; j ++){
                rowTemp.push(defaulValue);
            }
            this.data.push(rowTemp);
        }    
    }
    
    isValidPosition(row,col){
        return row >= 0 && row < this.rows &&  col>= 0 &&   col < this.cols;
    
}

    setValue(row, col, value)  {
        if(isValidPosition(row,col)){
            this.data[row][col] = value;
        }   
    }

    getValue(row,col){
        if(this.isValidPosition(row,col)){
        return this.data[row][col];
    } else{
        return null
    }
}

    fillRandom(min,max){
        for(let i = 0; i < this.rows; i ++){
            for(let j = 0; j < this.cols; j ++){
                const random = Math.floor(Math.random() * (max - min + 1)) +  min;
                this.data[i][j] = random;
            }
        }
    }

   fillIncrementRows() {
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            this.data[i][j] = i;
        }
    }
}



    toString(){
       return this.data.map(row => row.join('\t'). join('\n'));
    }


    // EJ 1
    fillExercise1() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 1;
            }
        }
    }

    // EJ 2
    fillExercise2() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (i === 0 || i === this.rows - 1 || j === 0 || j === this.cols - 1) {
                    this.data[i][j] = 0;
                } else {
                    this.data[i][j] = 1;
                }
            }
        }
    }

    // EJ 3
    fillExercise3() {
        const mid = Math.floor(this.rows / 2);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (i === mid || j === mid) {
                    this.data[i][j] = 1;
                } else {
                    this.data[i][j] = 0;
                }
            }
        }
    }

    // EJ 4
    fillExercise4() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (i === 0 || j === 0 || i === this.rows - 1 || j === this.cols - 1) {
                    this.data[i][j] = 1;
                } else if (i === j || i + j === this.cols - 1) {
                    this.data[i][j] = 2;
                } else {
                    this.data[i][j] = 0;
                }
            }
        }
    }

    // EJ 5
    fillExercise5() {
        const franja = Math.floor(this.rows / 3);
        for (let i = 0; i < this.rows; i++) {
            let valor = 0;
            if (i < franja) valor = 1;
            else if (i < franja * 2) valor = 2;
            else valor = 0;
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = valor;
            }
        }
    }

    // EJ 6
    fillExercise6() {
        for (let i = 0; i < this.rows; i++) {
            const valor = i % 2 === 0 ? 1 : 0;
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = valor;
            }
        }
    }

    // EJ 7
    fillExercise7() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (j === i) {
                    this.data[i][j] = 1;
                } else {
                    this.data[i][j] = 0;
                }
            }
        }
    }

    // EJ 8
    fillExercise8() {
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            this.data[i][j] = 0;
        }
    }

    let top = 0;
    let bottom = this.rows - 1;
    let left = 0;
    let right = this.cols - 1;

    while (top <= bottom && left <= right) {
        for (let j = left; j <= right; j++) this.data[top][j] = 1;
        top++;

        for (let i = top; i <= bottom; i++) this.data[i][right] = 1;
        right--;

        if (top <= bottom) {
            for (let j = right; j >= left; j--) this.data[bottom][j] = 1;
            bottom--;
        }

        if (left <= right) {
            for (let i = bottom; i >= top; i--) this.data[i][left] = 1;
            left++;
        }

        top++;
        left++;
        bottom--;
        right--;
    }
}



    // EJ 9
    fillExercise9() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (j <= i) {
                    this.data[i][j] = 1;
                } else {
                    this.data[i][j] = 0;
                }
            }
        }
    }

    // EJ 10
    fillExercise10() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (j >= this.cols - i - 1) {
                    this.data[i][j] = 1;
                } else {
                    this.data[i][j] = 0;
                }
            }
        }
    }

    // EJ 11
    fillExercise11() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (i % 2 === 0 || j === 0 || j === this.cols - 1) {
                    this.data[i][j] = 1;
                } else {
                    this.data[i][j] = 0;
                }
            }
        }
    }

    // EJ 12
    fillExercise12() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (i >= 1 && i <= 5 && j >= 4 - i + 1 && j <= 4 + i - 1) this.data[i][j] = 1;
                else this.data[i][j] = 0;
            }
        }
    }

    // EJ 13
    fillExercise13() {
        const mid = Math.floor(this.rows / 2);
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++)
                this.data[i][j] = (Math.abs(i - mid) + Math.abs(j - mid) <= mid) ? 1 : 0;
    }

    // EJ 14
    fillExercise14() {
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++)
                this.data[i][j] = (i === 2 || i === 7 || j === 2 || j === 7 || i === 4 || j === 4) ? 1 : 0;
    }

    // EJ 15
    fillExercise15() {
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++)
                this.data[i][j] = (j <= i) ? 1 : 0;
    }

    // EJ 16
    fillExercise16() {
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++) {
                if (i === 0 || i === 9 || j === 0 || j === 9) this.data[i][j] = 1;
                else if (i >= 2 && i <= 7 && j >= 2 && j <= 7) {
                    if (i === 2 || i === 7 || j === 2 || j === 7) this.data[i][j] = 2;
                    else this.data[i][j] = 0;
                } else this.data[i][j] = 0;
            }
    }

   // EJ 17
    fillExercise17() {
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            if (i === 0 || i === this.rows - 1 || j === 0 || j === this.cols - 1) {
                // Bordes exteriores
                this.data[i][j] = 1;
            } 
            // 🔹
            else if (i >= 3 && i <= 6 && j >= 3 && j <= 6) {
                this.data[i][j] = 2;
            } 
            else {
                this.data[i][j] = 0;
            }
        }
    }
}


    // EJ 18
    fillExercise18() {
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++)
                this.data[i][j] = (i % 2 === 0 || j === 0 || j === 9) ? 1 : 0;
    }

    // EJ 19
    fillExercise19() {
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++)
                this.data[i][j] = ((i + j) % 4 === 0 || (i - j) % 4 === 0) ? 1 : 0;
    }

    // EJ 20
    fillExercise20() {
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++)
                this.data[i][j] = (i + j < 4 || i - j > 5 || j - i > 5 || i + j > 13) ? 1 : 0;
    }

    // EJ 21
    fillExercise21() {
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++)
                this.data[i][j] = (i + j) % 2 === 0 ? 1 : 0;
    }

    // EJ 22
    fillExercise22() {
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.cols; j++) {
                const cond = (j >= i && j < this.cols - i) || (j <= i && j >= this.cols - i - 1);
                this.data[i][j] = cond ? 1 : 0;
            }
    }
}
