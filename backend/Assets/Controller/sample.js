Student.findOneAndUpdate(
    { admission_id: data.admission_id, 'outpass_history.status': data.status },
    { $set: { 'outpass_history.$.status': status } },
    { new: true },
    (err, updatedStudent) => {
      if (err) {
        res.json({ message: err });
      } else if (!updatedStudent) {
        res.json({ message: 'Student not found or no matching outpass with the specified status.' });
      } else {
        res.status(201).json({ message: 'Change student status success' });
      }}
  );

  const student = await Student.findOneAndUpdate(
    { admission_id:data.id },
    { $push: {outpass_history:{
        name: data.name,
        course: data.course,
        hostel: data.hostel,
        admission_id: data.id,
        room_number: data.room,
        mobile_number:data.mobile,
        status:"waiting",
        out:data.out,
        in:data.In,
        reason:data.reason
    }} },
    { new: true } 
  ).then(async()=>{
    console.log("get delete");
  })