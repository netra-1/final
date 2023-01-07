import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './manager/dashbord/dashboard';
import { announcementColumn, cakeColumns, customerColumns, decorationColumns, drinksColumns, eventColumn, myEventsColumns, staffColumns, themeColumns, venueColumns } from './utils/datatable/datatablesource';
import AddList from './utils/list/List';
import AddVenue from './manager/venue/add_venue';
import UpdateVenue from './manager/venue/update_venue';
import AddTheme from './manager/theme/add_theme';
import UpdateTheme from './manager/theme/update_theme';
import AddCake from './manager/cake/add_cake';
import UpdateCake from './manager/cake/update_cake';
import AddDecoration from './manager/decoration/add_decoration';
import UpdateDecoration from './manager/decoration/update_decoration';
import AdminLogin from './manager/login/login';
import AddDrink from './manager/drinks/add_drink';
import UpdateDrink from './manager/drinks/update_drinks';
import StaffDashboard from './staff/dashboard/staff_dashboard';
import AddStaff from './manager/staff/add_staff';
import ChatWithCust from './staff/chat/chat';
import SingleEvent from './staff/single_event/single_event';
import Profile from './staff/settings/profile/profile';
import ChangePassword from './staff/settings/change password/change_password';
import ResetPassword from './staff/reset_password/reset_password';
import AddAnnouncement from './manager/announcement/add_announcement';
import UpdateAnnouncement from './manager/announcement/update_announcement';
import ShowVenue from './manager/venue/show_venue';
import ManagerPrivateRoute from './utils/route_protection/manager_route_protection';
import StaffPrivateRoute from './utils/route_protection/staff_route_protection';

const Body = () =>{
    return(
        <>
        <Routes>

            <Route path = '/' element={<ManagerPrivateRoute><AdminDashboard/></ManagerPrivateRoute>}/>

            <Route path="/venue" element={ <AddList columns={venueColumns} /> } />
            <Route path="/venue/new" element={ <ManagerPrivateRoute> <AddVenue /> </ManagerPrivateRoute>} />
            <Route path="/venue/update/:venueId" element={<ManagerPrivateRoute> <UpdateVenue /> </ManagerPrivateRoute>} />

            <Route path="/theme" element={ <AddList columns={themeColumns} /> } />
            <Route path="/theme/new" element={<ManagerPrivateRoute> <AddTheme /> </ManagerPrivateRoute>} />
            <Route path="/theme/update/:themeId" element={<ManagerPrivateRoute> <UpdateTheme /></ManagerPrivateRoute> } />

            <Route path="/cake" element={ <AddList columns={cakeColumns} /> } />
            <Route path="/cake/new" element={<ManagerPrivateRoute> <AddCake /> </ManagerPrivateRoute>} />
            <Route path="/cake/update/:cakeId" element={<ManagerPrivateRoute> <UpdateCake /> </ManagerPrivateRoute>} />

            <Route path="/decoration" element={ <AddList columns={decorationColumns} /> } />
            <Route path="/decoration/new" element={<ManagerPrivateRoute> <AddDecoration /> </ManagerPrivateRoute>} />
            <Route path="/decoration/update/:decorationId" element={<ManagerPrivateRoute> <UpdateDecoration /> </ManagerPrivateRoute>} />

            <Route path="/drink" element={ <AddList columns={drinksColumns} /> } />
            <Route path="/drink/new" element={<ManagerPrivateRoute> <AddDrink /> </ManagerPrivateRoute>} />
            <Route path="/drink/update/:drinkId" element={<ManagerPrivateRoute> <UpdateDrink /> </ManagerPrivateRoute>} />

            <Route path="/staff" element={ <ManagerPrivateRoute> <AddList columns={staffColumns} apipath={"user/staff-list"}  /></ManagerPrivateRoute> } />
            <Route path="/staff/new" element={<ManagerPrivateRoute> <AddStaff /> </ManagerPrivateRoute>} />

            <Route path='/login' element={<AdminLogin></AdminLogin>} />



            {/* Staff */}

            <Route path = '/staff_dashboard' element={<StaffPrivateRoute><StaffDashboard/></StaffPrivateRoute>}/>

            <Route path="/event" element={ <AddList columns={eventColumn} /> } />

            <Route path="/customer" element={ <AddList columns={customerColumns} apipath={"user/customer-list"}  /> } />


            <Route path="/staff/chat" element={<StaffPrivateRoute> <ChatWithCust /></StaffPrivateRoute> } />
            <Route path="/staff/single_event/:id" element={ <StaffPrivateRoute><SingleEvent /></StaffPrivateRoute> } />


            <Route path='/staff/profile' element={<StaffPrivateRoute><Profile/></StaffPrivateRoute>}/>
            <Route path='/staff/change_password' element={<StaffPrivateRoute><ChangePassword/></StaffPrivateRoute>}/>
            <Route path='/reset_password' element={<ResetPassword/>}/>

            <Route path="/announcement" element={<ManagerPrivateRoute> <AddList columns={announcementColumn} apipath={"announcement"} /></ManagerPrivateRoute> } />
            <Route path="/announcement/new" element={<ManagerPrivateRoute> <AddAnnouncement /> </ManagerPrivateRoute> }/>
            <Route path="/announcement/update/:announcementId" element={<ManagerPrivateRoute> <UpdateAnnouncement /> </ManagerPrivateRoute> }/>

            <Route path="/my_events" element={<StaffPrivateRoute> <AddList columns={myEventsColumns} apipath={"/event/mine"} /> </StaffPrivateRoute> } />

            <Route path='/all_venue' element={<ShowVenue/>}/>
            
        </Routes>
        </>
    )
}

export default Body;