import React, { useState } from "react";
import { CardImg, CardTitle, Breadcrumb, BreadcrumbItem, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
function RenderMenu({ items }) {
    return (
        <Link style={{ textDecoration: "none", color: "black", fontSize: "30px", fontWeight: "bold" }} to={`/Staff/${items.id}`} className="col-lg-6 col-md-3 col-sm-2 " >
            <CardImg className="card-menu" width="100%" src={items.image} alt={items.name} />
            <CardTitle style={{ textAlign: "center" }}>{items.name}</CardTitle>
        </Link>
    )
}
// =======lọc tìm tên nhân viên ============
const Staff = function (props) {
    const [name, setName] = useState('');
    const [names, setNames] = useState([])
    var filterName = []
    const HandleSearch = () => {
        filterName = props.items.filter(function (el) {
            // console.log(props.items[i].name)
            return el.name === name
        })
        console.log(filterName)
        if(names!=null) {
            setNames(filterName)
        }
    }
    const Staff = props.items && props.items.map((item) =>
    (
        <RenderMenu key={item.id} items={item} />


    ))
    return (
        <div>
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem className="childfolder"><Link to="/home" >Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active className="childfolder">Nhân viên</BreadcrumbItem>
                    </Breadcrumb>
                    <input className="col-7 input-text" value={name} onChange={e => setName(e.target.value)} placeholder="Nhập tên nhân viên"/>
                    <button className="col-4 input-btn" onClick={HandleSearch}>Search</button>
                    {
                        names.map((rs, index) =>
                            <Link key={index} style={{ textDecoration: "none", color: "black", fontSize: "30px", fontWeight: "bold" }} to={`/Staff/${rs.id}`} className="col-lg-6 col-md-3 col-sm-2" >
                                <Card className="card-menu" key={index}>{rs.name}</Card>
                                <CardImg width="100%" src={rs.image} alt={rs.name} />
                            </Link>                         
                        )
                    }
                     <hr style={{marginTop: 10 + "px"}}/>
                </div>
            </div>
            <div className="container row row-content">
                {Staff}
            </div>
        </div>
    );
}
export default Staff;