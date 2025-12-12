import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
 
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from '../../../../api/api';
import ADMINAPI from '../../../../api/services/AdminLogin/adminAPI';


const editorConfiguration = {
  toolbar: {
    items: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
      'alignment', 'bulletedList', 'numberedList', 'outdent', 'indent', '|',
      'blockQuote', 'insertTable', 'mediaEmbed', '|',
      'undo', 'redo', 'codeBlock', '|',
      'horizontalLine', 'pageBreak'
    ]
  },
  fontSize: {
    options: [
      9, 11, 13, 'default', 17, 19, 21
    ],
    supportAllValues: true
  },
  fontFamily: {
    options: [
      'default', 'Arial, Helvetica, sans-serif', 'Courier New, Courier, monospace', 'Georgia, serif', 'Tahoma, Geneva, sans-serif', 'Times New Roman, Times, serif', 'Verdana, Geneva, sans-serif'
    ]
  },
  fontColor: {
    columns: 5,
    documentColors: 10,
  },
  fontBackgroundColor: {
    columns: 5,
    documentColors: 10,
  },
  table: {
    contentToolbar: [
      'tableColumn', 'tableRow', 'mergeTableCells'
    ]
  },
  language: 'en'
};

function Settingform() {

    // Setting UseState Method
    const [list,setList] = useState([])
    const [systemName,setSystemName] = useState('')
    const [shortName,setShortName] = useState('')
    const [systemLogo,setSystemLogo] = useState(null)
    const [websiteCover,setWebsiteCover] = useState(null)
    const [data, setData] = useState(null);
    const navigate = useNavigate('')

    const [value, setValue] = useState('');
    const [editorData, setEditorData] = useState(`
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper leo vitae dui rutrum ultricies. Etiam sit amet odio lorem. In sit amet cursus justo. Morbi pellentesque, dolor in sodales pretium, libero leo finibus arcu, vitae pharetra ligula quam quis enim. Quisque suscipit venenatis finibus. Curabitur fermentum, diam ut dictum molestie, eros dolor luctus dolor, in hendrerit dui sapien vel lorem. Nulla ultrices gravida nisl, id feugiat turpis varius a. In iaculis lorem nisi. Aliquam nec aliquam ipsum, vitae fermentum dui.
      </p>
      <p>
      Phasellus luctus ultricies dui, non euismod massa congue id. Fusce ut nisi convallis, aliquam dolor consectetur, varius enim. Phasellus dignissim, erat ac ullamcorper lacinia, nibh est auctor risus, eget ornare est felis et orci. Pellentesque aliquam, lectus sed porttitor consequat, sem orci fringilla nisi, a pellentesque metus tellus nec tellus. Nullam metus tortor, mattis in tristique et, tincidunt ac dui. Praesent id viverra diam, vel cursus nulla. Vestibulum ut lobortis velit, a euismod eros. Integer dignissim finibus rhoncus. Praesent non neque ac ipsum lobortis commodo sed ac massa. Mauris justo tortor, dapibus
       sit amet dui sed, congue vehicula urna.
       </p>
       <p>
       Nullam nisi metus, convallis quis consectetur vitae, laoreet ac nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin ligula augue, vestibulum in auctor pharetra, posuere id lacus. Aenean aliquam felis quis condimentum congue. Donec porttitor ultricies mi eget vestibulum. Nullam in magna tortor. Suspendisse ullamcorper ultricies accumsan. Duis ultrices sollicitudin velit sed auctor. Vivamus semper placerat porttitor. Praesent diam lorem, luctus sit amet viverra non, consequat ac elit. Suspendisse eleifend massa sit amet nisl porta, eu rutrum massa blandit. Integer congue lacus non fringilla suscipit.
       </p>
       <p>
       Aliquam erat volutpat. Fusce scelerisque pulvinar bibendum. Proin convallis elit at molestie egestas. Cras ornare ornare dolor quis mattis. Suspendisse in egestas odio. Fusce nibh ante, ultrices nec elit at, auctor elementum nunc. Curabitur facilisis mauris at congue maximus. Integer a facilisis nisl, sed laoreet odio. Nulla facilisi. Vivamus sed tincidunt eros, non convallis metus. Nullam vestibulum nisi at est euismod, et molestie ligula dapibus. Integer ligula felis, volutpat a accumsan id, egestas nec dolor. Duis dignissim condimentum lectus, eget pharetra ex laoreet vitae. Nam enim mauris, pharetra sit amet leo eget, condimentum lacinia neque.
       </p>
       `);
    const [editorData1, setEditorData1] = useState(`
      <p>
        Praesent id pretium neque. Nullam nec scelerisque quam. Donec faucibus erat enim, sit amet aliquet ipsum suscipit at. Suspendisse interdum euismod libero, eu tincidunt ligula elementum a. Nulla id velit vestibulum nisl scelerisque pretium sed at neque.
      </p>
      
      <p>
        In dignissim purus ut nibh rutrum, at placerat ex elementum. Nam eleifend, sapien ac luctus eleifend, orci purus pulvinar nisl, et scelerisque erat turpis ac tellus. Duis a libero sit amet massa posuere molestie. Nam vel velit eget libero scelerisque varius. Morbi sodales consectetur eros sed lacinia. Phasellus lobortis, neque sed consequat commodo, felis elit tempor sapien, eu blandit ante ex eu magna. Maecenas pulvinar lectus sed augue pharetra porttitor et sed ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent mattis ante est, sed fringilla nisi posuere non.
      </p>
      
      <p>
        Quisque commodo tincidunt rhoncus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas molestie lacus lacus. Pellentesque velit quam, cursus sit amet congue sed, facilisis et risus. Duis ac consequat eros, id venenatis tortor. Nulla vitae iaculis ante. Morbi id felis non ipsum facilisis sagittis. Integer sed quam et metus pretium tempor sit amet non neque. Praesent eu ante a mauris auctor tempor. Pellentesque luctus erat eget metus vulputate iaculis. Sed rhoncus malesuada ipsum, sed imperdiet leo consequat et. In eu mauris eu felis lacinia semper sit amet nec nisi. Aliquam convallis, neque eget dignissim aliquam, sem enim laoreet arcu, vitae maximus nisi nisl vitae tellus.
      </p>
      
      <p>
        Quisque aliquet tellus sed nulla vulputate pharetra et nec mauris. Nulla placerat magna sed enim ullamcorper, ac tempor turpis varius. Sed in ipsum id odio varius pellentesque. In hac habitasse platea dictumst. Nunc eget nisi sed nisl pellentesque posuere. Nulla quis nibh nec neque ornare mollis sed vitae eros. Nulla nulla turpis, bibendum euismod purus sit amet, semper aliquam enim. Proin dignissim ac nisl in lobortis. Aenean at justo vel ipsum pretium dapibus. Aliquam lorem mi, laoreet eu leo ac, congue blandit orci. Sed vulputate suscipit nibh, at ultrices ipsum sagittis nec.
      </p>
      
      <p>
        Ut viverra maximus orci et tincidunt. Aliquam erat volutpat. Morbi convallis nibh nec libero ultrices, id suscipit nisl facilisis. Maecenas sed consectetur leo, id tempus nisl. Maecenas tincidunt ultrices ex sed feugiat. Nunc sit amet arcu enim. Nunc tristique faucibus elit sed mollis. Cras commodo tincidunt porttitor.
      </p>
      
      <p>
        Ut mattis massa non libero ornare blandit. Sed et gravida ex. Sed sollicitudin commodo enim, nec venenatis augue molestie eu. Quisque ut eros ut lectus posuere hendrerit et ut justo. Nullam egestas iaculis lacus hendrerit maximus. Sed ut nisi sem. Integer varius nunc a urna accumsan ullamcorper. Aenean eu faucibus nibh. Praesent ornare dictum orci, nec vehicula turpis pulvinar non. Ut vulputate, justo vel venenatis posuere, urna dui efficitur erat, id laoreet enim ex non nisi.
      </p>
      
      <p>
        Fusce sollicitudin, dolor et dictum porta, tellus felis hendrerit arcu, vitae lacinia mauris ligula ut neque. Quisque eu ante velit. Cras euismod imperdiet eleifend. Aenean id efficitur metus. Donec ut sapien purus. Vestibulum tincidunt ullamcorper est ut sagittis. Maecenas id ex mi. Pellentesque leo enim, tempus eget maximus at, eleifend a nunc. Sed accumsan tellus nec massa sodales ultricies.
      </p>
    `);
    


    const handleChange = (content) => {
      setValue(content);
    };

 

    useEffect(() => {
        systemList();
    },[] );
    
   
    
 // Handler for file input change
 const handleFileChange = (e) => {
    setSystemLogo(e.target.files[0]);
  };

  const handleFileChange1 = (e) => {
    setWebsiteCover(e.target.files[0]);
  };


    // System List Method

  const systemList = async () => {
    try {
        const response = await ADMINAPI.adminSettingList();
        const fetchedList = response.result.SystemData;

       
        setList(fetchedList);
        setSystemName(fetchedList.map(item => item.name));
        setShortName(fetchedList.map(item => item.short_name));
        setSystemLogo(fetchedList.map(item => item.logo));
        setWebsiteCover(fetchedList.map(item => item.cover));
    } catch (error) {
        console.log("Error handled =", error);
    }
};

     // Settings Edit Api Method

    const settingEdit = async (e) => {
      e.preventDefault();
    
      try {
       const formData = new FormData();
        formData.append('name', systemName);
        formData.append('short_name', shortName);
        formData.append('logo', systemLogo);
        formData.append('cover', websiteCover);
       
            console.log('FormData being sent:', [...formData.entries()]);
    
        const responseData = await ADMINAPI.adminSettingUpdate(formData); 
    
        if (responseData.apiStatus.code === '200') {
          navigate('/adminsetting');
          toast.success(responseData.apiStatus.message);
        } else {
          toast.error(responseData.apiStatus.message);
        }
      } catch (error) {
        console.error('Error in clientEdit:', error);
      } finally {
      }
    };
    
    return (
        <div>

            <div class="card">
           

                <div class="card-body">
                    <form class="forms-sample">
                        <div className='row'>
                        <div className='col-md-6'>
                <div class="form-group">
                  <label for="exampleInputUsername1">System Name</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" 
                  onChange={(e)=>setSystemName(e.target.value)}
                  value={systemName}
                  placeholder="System Name" />
                </div>
              </div>
              <div className='col-md-6'>
                <div class="form-group">
                  <label for="exampleInputUsername1">System Short Name</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" 
                  onChange={(e)=>setShortName(e.target.value)}
                  value={shortName}
                  placeholder="System Short Name" />
                </div>
              </div>
             
             
<div className="col-md-12">
  <div className="form-group">
    <h4 >Welcome</h4>
    <div className="ckeditor-container">
    <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onReady={(editor) => {
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
            placeholder="Type here..."
          />
    </div>
  </div>
</div>


<div style={{marginTop:"60px",marginBottom:"30px"}} className="col-md-12">
  <div className="form-group">
  <h4 >About Us</h4>
  <div className="ckeditor-containers">
    <CKEditor
      editor={ClassicEditor}
      data={editorData1}
      onReady={(editor) => {
        console.log('Editor is ready to use!', editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setEditorData1(data);
        console.log({ event, editor, data });
      }}
      onBlur={(event, editor) => {
        console.log('Blur.', editor);
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor);
      }}
      placeholder="awdwdeqwsqsq"
    />
  </div>
  </div>
  
</div>
{/* 
  <div class="note-resizebar" aria-label="Resize">
      <div class='note-icon-bar'></div>
      <div class='note-icon-bar'></div>
      <div class='note-icon-bar'></div>

</div> */}




              {/* <div className='col-md-12'>
                <div class="form-group">
                  <label for="exampleInputUsername1">About Us</label>
                  <textarea style={{marginTop:"15px"}} type="text" rows="8" class="form-control" id="exampleInputUsername1" 
                  >  <ReactQuill value={value} onChange={handleChange} /></textarea>
                </div>
              </div> */}
              <div className='col-md-6'>
                <div class="form-group">
                  <label for="exampleInputUsername1">System Logo</label>
                  <input type="file" class="form-control" id="exampleInputUsername1" 
                  onChange={handleFileChange}
                  placeholder="System Short Name" />
                </div>
              </div>
              {/* <div className='col-md-6'>
                <div class="form-group">
                  <label for="exampleInputUsername1">System Short Name</label>
                  <textarea style={{marginTop:"15px"}} type="text" rows="8" class="form-control" id="exampleInputUsername1" 
                  onChange={(e)=>setShortName(e.target.value)}
                  value={shortName}
                  placeholder="System Short Name" ></textarea>
                </div>
              </div> */}
              <div className='col-md-6'>
                <div class="form-group">
                  <label for="exampleInputUsername1">Website Cover</label>
                  <input type="file" class="form-control" id="exampleInputUsername1" 
                  onChange={handleFileChange1}
                  placeholder="System Short Name" />
                </div>
              </div>
              {/* <div className='col-md-6'>
                <div class="form-group">
                  <label for="exampleInputUsername1">System Short Name</label>
                  <input type="text" class="form-control" id="exampleInputUsername1" 
                  onChange={(e)=>setShortName(e.target.value)}
                  value={shortName}
                  placeholder="System Short Name" />
                </div>
              </div> */}

        <div className='col-md-6'>
                <img style={{width:"150px",height:"150px",borderRadius:"50%"}} src={environment.baseURL+systemLogo} />
                {/* <img style={{width:"150px",height:"150px"}} src='/assets/images/hs.logo.png' /> */}

        </div>
        <div className='col-md-6'>
        <img style={{width:"150px",height:"150px",borderRadius:"50%"}} src={environment.baseURL+websiteCover} />
            
        </div>

                        </div>

        <button type="submit" style={{marginTop:"50px"}} 
        onClick={settingEdit} 
        class="btn btn-gradient-primary me-2">Update</button>  

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Settingform
