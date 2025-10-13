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
    
//Fubcion de validACION DE RANGO VALIDO EN LA MATRIZ
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
    // Cada fila i se rellena con el valor i (0..rows-1)
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            this.data[i][j] = i;
        }
    }
}



    toString(){
       return this.data.map(row => row.join('\t'). join('\n'));
    }

    // ----------------------------
    // EJERCICIOS DEL PRÁCTICO SIS-112
    // ----------------------------

    // 1
    fillExercise1() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 1;
            }
        }
    }

    // 2
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

    // 3
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

    // 4
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

    // 5
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

    // 6
    fillExercise6() {
        for (let i = 0; i < this.rows; i++) {
            const valor = i % 2 === 0 ? 1 : 0;
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = valor;
            }
        }
    }

    // 7
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

    // 8
    fillExercise8() {
    // Reiniciar matriz a ceros
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
        // izquierda -> derecha (fila superior)
        for (let j = left; j <= right; j++) this.data[top][j] = 1;
        // bajar la frontera superior
        top++;

        // arriba -> abajo (columna derecha)
        for (let i = top; i <= bottom; i++) this.data[i][right] = 1;
        // mover la frontera derecha
        right--;

        // derecha -> izquierda (fila inferior)
        if (top <= bottom) {
            for (let j = right; j >= left; j--) this.data[bottom][j] = 1;
            bottom--;
        }

        // abajo -> arriba (columna izquierda)
        if (left <= right) {
            for (let i = bottom; i >= top; i--) this.data[i][left] = 1;
            left++;
        }

        // Avanzamos las fronteras una vez más para dejar
        // una "línea" de ceros entre esta vuelta y la siguiente.
        top++;
        left++;
        bottom--;
        right--;
    }
}



    // 9
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

    // 10
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

    // 11
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
}