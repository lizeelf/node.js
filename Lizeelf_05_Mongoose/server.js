var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testDB2');

var db = mongoose.connection;

db.on('error', function(){
  console.log('Connection Failed!');
});

db.once('open', function(){
  console.log('Connected!');
});

// Schema는 원하는 이름으로...
var student = mongoose.Schema({
  name: 'string',
  address: 'string',
  age: 'number'
});

var Student = mongoose.model('Schema', student);

var newStudent = new Student({name: 'Hong Gil Dong', address: '서울시 강남구 논현동', age: '22'});

// [SET] Save data
newStudent.save(function(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log('Saved!');
  }
});

// [GET] All data
Student.find(function(error, students) {
  console.log('--- Read all ---');
  if (error) {
    console.log(error);
  } else {
    console.log(students);
  }
});

// [GET] One data
Student.findOne({_id: '59365a3062dbc7327fd8ef80'}, function(error, student) {
  console.log('--- Read one ---');
  if (error) {
    console.log(error);
  } else {
    console.log(student);
  }
});
/*
// [SET] Modify
Student.findById({_id: '59368a6a9ea65a1b6c5bc346'}, function(error, student) {
  console.log('--- Update(PUT) ---');
  if (error) {
    console.log(error);
  } else {
    student.name = '--modified--';
    student.save(function(error, modified_student) {
      if (error) {
        console.log(error);
      } else {
        console.log(modified_student);
      }
    });
  }
});
*/
/*
// [SET] Delete
Student.remove({_id: ''}, function(error, output) {
  console.log('--- Delete ---');
  if (error) {
    console.log(error);
  }
  console.log('--- deleted ---');
});
*/
