import "./style.css";
export default function Form() {
    return (
        <div className='dashboard-content'>
            <div className='dashboard-content__topbar topbar flex-ctr'>
                <div className='drawer-open'>
                    <span className='slice-top'></span>
                    <span className='slice-middle'></span>
                    <span className='slice-bottom'></span>
                </div>
            </div>
            <div className='dashboard-content__title-bar title-bar flex-ctr-spb'>
                <h3 className='title'>Login Page</h3>
            </div>
            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>

                    <div className='form-card'>
                        <div className='card-header'>
                            <h5 className='mb-0 h6'>Product Information</h5>
                        </div>
                        <div className='card-body'>
                            <div className='form-group row'>
                                <label className='col-md-3 col-from-label'>
                                    Product Name{" "}
                                    <span className='text-danger'>*</span>
                                </label>
                                <div className='col-md-8'>
                                    <div className="row sp-20">
                                        <div className="col-md-6">
                                            <input
                                            type='text'
                                            className='form-control'
                                            name='name'
                                            placeholder='First Name'
                                        />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                            type='text'
                                            className='form-control'
                                            name='name'
                                            placeholder='Last Name'
                                        />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='form-group row' id='brand'>
                                <label className='col-md-3 col-from-label'>
                                    Brand
                                </label>
                                <div className='col-md-8'>
                                        <select className='form-control aiz-selectpicker'>
                                            <option value=''>
                                                Select Brand
                                            </option>
                                            <option value='1'>Ford</option>
                                        </select>

                                </div>
                            </div>
                            <div className='form-group row'>
                                <label className='col-md-3 col-from-label'>
                                    Unit <span className='text-danger'>*</span>
                                </label>
                                <div className='col-md-8'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='unit'
                                        placeholder='Unit (e.g. KG, Pc etc)'
                                        required=''
                                    />
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label className='col-md-3 col-from-label'>
                                    Weight <small>(In Kg)</small>
                                </label>
                                <div className='col-md-8'>
                                    <input
                                        type='number'
                                        className='form-control'
                                        name='weight'
                                        step='0.01'
                                        value='0.00'
                                        placeholder='0.00'
                                    />
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label className='col-md-3 col-from-label'>
                                    Tags
                                </label>
                                <div className='col-md-8'>
                                    <input
                                        type='text'
                                        className='form-control aiz-tag-input'
                                        name='tags[]'
                                        placeholder='Type and hit enter to add a tag'
                                    />
                                    <small className='text-muted'>
                                        This is used for search. Input those
                                        words by which cutomer can find this
                                        product.
                                    </small>
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label className='col-md-3 col-from-label'>
                                    Textarea
                                </label>
                                <div className='col-md-8'>
                                    <textarea name="meta_description" rows="8" class="form-control"></textarea>
                                    <small className='text-muted'>
                                        This is used for search. Input those
                                        words by which cutomer can find this
                                        product.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-card">
                        <div className="card-header">
                            <h5 className="mb-0 h6">Product Images</h5>
                        </div>
                        <div className="card-body">
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label" for="signinSrEmail">Gallery Images <small>(600x600)</small></label>
                                <div className="col-md-8">
                                    <div className="input-group input-group-file" data-toggle="aizuploader" data-type="image" data-multiple="true">
                                        <label className="input-group-prepend" htmlFor="file1">
                                            <div className="input-group-text bg-soft-secondary font-weight-medium">Browse</div>
                                        </label>
                                        <label className="form-control file-amount" htmlFor="file1">Choose file</label>
                                        <input id="file1" type="file" name="photos" className="selected-files" hidden/>
                                    </div>
                                    <div className="file-preview"></div>
                                    <small className="text-muted">These images are visible in product details page gallery. Use 600x600 sizes images.</small>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label" for="signinSrEmail">Thumbnail Image <small>(300x300)</small></label>
                                <div className="col-md-8">
                                    <div className="input-group input-group-file" data-toggle="aizuploader" data-type="image">
                                        <label className="input-group-prepend" htmlFor="file2">
                                            <div className="input-group-text bg-soft-secondary font-weight-medium">Browse</div>
                                        </label>
                                        <label htmlFor="file2" className="form-control file-amount">Choose file</label>
                                        <input hidden type="file" id="file2" name="thumbnail_img" className="selected-files"/>
                                    </div>
                                    <div className="file-preview"></div>
                                    <small className="text-muted">This image is visible in all product box. Use 300x300 sizes image. Keep some blank space around main object of your image as we had to crop some edge in different devices to make it responsive.</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-card">
                        <div className="card-header">
                            <h5 className="mb-0 h6">Form Example 3</h5>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label className="col-form-label" for="signinSrEmail">Gallery Images <small>(600x600)</small></label>
                                <div>
                                    <div className="input-group input-group-file" data-toggle="aizuploader" data-type="image" data-multiple="true">
                                        <label className="input-group-prepend" htmlFor="file1">
                                            <div className="input-group-text bg-soft-secondary font-weight-medium">Browse</div>
                                        </label>
                                        <label className="form-control file-amount" htmlFor="file1">Choose file</label>
                                        <input id="file1" type="file" name="photos" className="selected-files" hidden/>
                                    </div>
                                    <div className="file-preview"></div>
                                    <small className="text-muted">These images are visible in product details page gallery. Use 600x600 sizes images.</small>
                                </div>
                            </div>

                            <div className='form-group'>
                                <label className='col-from-label'>
                                    Unit <span className='text-danger'>*</span>
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='unit'
                                        placeholder='Unit (e.g. KG, Pc etc)'
                                        required=''
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
